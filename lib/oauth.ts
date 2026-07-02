import "server-only";

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createUserSession, safeCallbackPath } from "@/lib/auth";

type OAuthProvider = "google" | "facebook";

type OAuthConfig = {
  clientId: string | undefined;
  clientSecret: string | undefined;
  authorizationUrl: string;
  tokenUrl: string;
  profileUrl: string;
  scope: string;
};

type OAuthProfile = {
  providerAccountId: string;
  email: string;
  name: string;
  image?: string;
  emailVerified?: boolean;
};

const stateCookieName = "moneyfest_oauth_state";
const callbackCookieName = "moneyfest_oauth_callback";

function siteUrl(request: NextRequest) {
  return process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}

function providerConfig(provider: OAuthProvider): OAuthConfig {
  if (provider === "google") {
    return {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      profileUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: "openid email profile",
    };
  }

  return {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    authorizationUrl: "https://www.facebook.com/v20.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v20.0/oauth/access_token",
    profileUrl: "https://graph.facebook.com/me?fields=id,name,email,picture",
    scope: "email,public_profile",
  };
}

function redirectUri(request: NextRequest, provider: OAuthProvider) {
  return `${siteUrl(request)}/auth/oauth/${provider}/callback`;
}

function errorRedirect(request: NextRequest, error: string) {
  return NextResponse.redirect(new URL(`/auth/error?error=${error}`, request.nextUrl.origin));
}

function isProvider(value: string): value is OAuthProvider {
  return value === "google" || value === "facebook";
}

export async function startOAuth(request: NextRequest, providerValue: string) {
  if (!isProvider(providerValue)) return errorRedirect(request, "oauth_failed");

  const config = providerConfig(providerValue);
  if (!config.clientId || !config.clientSecret) return errorRedirect(request, "missing_oauth_config");

  const state = randomBytes(24).toString("hex");
  const callbackUrl = safeCallbackPath(request.nextUrl.searchParams.get("callbackUrl"));
  const authorizationUrl = new URL(config.authorizationUrl);
  authorizationUrl.searchParams.set("client_id", config.clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri(request, providerValue));
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", config.scope);
  authorizationUrl.searchParams.set("state", state);
  if (providerValue === "google") authorizationUrl.searchParams.set("access_type", "offline");

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(stateCookieName, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });
  response.cookies.set(callbackCookieName, callbackUrl, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });
  return response;
}

async function requestToken(request: NextRequest, provider: OAuthProvider, code: string) {
  const config = providerConfig(provider);
  if (!config.clientId || !config.clientSecret) throw new Error("Missing OAuth config");

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: redirectUri(request, provider),
    grant_type: "authorization_code",
  });

  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error("OAuth token request failed");
  return response.json() as Promise<{ access_token?: string; refresh_token?: string; expires_in?: number; token_type?: string; scope?: string; id_token?: string }>;
}

async function requestProfile(provider: OAuthProvider, accessToken: string): Promise<OAuthProfile> {
  const config = providerConfig(provider);
  const response = await fetch(config.profileUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("OAuth profile request failed");
  const profile = (await response.json()) as Record<string, unknown>;

  if (provider === "google") {
    const id = typeof profile.sub === "string" ? profile.sub : "";
    const email = typeof profile.email === "string" ? profile.email.toLowerCase() : "";
    const name = typeof profile.name === "string" ? profile.name : email;
    const image = typeof profile.picture === "string" ? profile.picture : undefined;
    const emailVerified = profile.email_verified === true;
    if (!id || !email) throw new Error("Google profile missing email");
    return { providerAccountId: id, email, name, image, emailVerified };
  }

  const id = typeof profile.id === "string" ? profile.id : "";
  const email = typeof profile.email === "string" ? profile.email.toLowerCase() : "";
  const name = typeof profile.name === "string" ? profile.name : email;
  const picture = profile.picture as { data?: { url?: unknown } } | undefined;
  const image = typeof picture?.data?.url === "string" ? picture.data.url : undefined;
  if (!id || !email) throw new Error("Facebook profile missing email");
  return { providerAccountId: id, email, name, image, emailVerified: true };
}

export async function finishOAuth(request: NextRequest, providerValue: string) {
  if (!isProvider(providerValue)) return errorRedirect(request, "oauth_failed");
  if (request.nextUrl.searchParams.get("error")) return errorRedirect(request, "oauth_denied");

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(stateCookieName)?.value;
  const actualState = request.nextUrl.searchParams.get("state");
  const callbackUrl = safeCallbackPath(cookieStore.get(callbackCookieName)?.value);
  if (!expectedState || !actualState || expectedState !== actualState) {
    return errorRedirect(request, "invalid_oauth_state");
  }

  try {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) return errorRedirect(request, "oauth_failed");
    const token = await requestToken(request, providerValue, code);
    if (!token.access_token) return errorRedirect(request, "oauth_failed");
    const profile = await requestProfile(providerValue, token.access_token);
    const user = await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        name: profile.name,
        image: profile.image,
        emailVerified: profile.emailVerified ? new Date() : undefined,
        lastLogin: new Date(),
      },
      create: {
        name: profile.name,
        email: profile.email,
        image: profile.image,
        emailVerified: profile.emailVerified ? new Date() : undefined,
        lastLogin: new Date(),
      },
    });

    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: providerValue,
          providerAccountId: profile.providerAccountId,
        },
      },
      update: {
        userId: user.id,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        expiresAt: token.expires_in ? Math.floor(Date.now() / 1000) + token.expires_in : undefined,
        tokenType: token.token_type,
        scope: token.scope,
        idToken: token.id_token,
      },
      create: {
        userId: user.id,
        type: "oauth",
        provider: providerValue,
        providerAccountId: profile.providerAccountId,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        expiresAt: token.expires_in ? Math.floor(Date.now() / 1000) + token.expires_in : undefined,
        tokenType: token.token_type,
        scope: token.scope,
        idToken: token.id_token,
      },
    });

    await createUserSession(user.id);
    cookieStore.delete(stateCookieName);
    cookieStore.delete(callbackCookieName);
    return NextResponse.redirect(new URL(callbackUrl, request.nextUrl.origin));
  } catch {
    return errorRedirect(request, "oauth_failed");
  }
}
