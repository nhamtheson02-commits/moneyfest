import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const sessionCookieName = "moneyfest_session";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  accountType: string;
  image: string | null;
};

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const stored = Buffer.from(hash, "hex");
  return stored.length === candidate.length && timingSafeEqual(stored, candidate);
}

export async function createUserSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + sessionMaxAgeSeconds * 1000);
  await prisma.session.create({
    data: {
      sessionToken: token,
      userId,
      expires,
    },
  });
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  });
}

export function safeCallbackPath(value: FormDataEntryValue | string | null | undefined) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/account";
  }
  if (value.startsWith("/auth/")) return "/account";
  return value;
}

export async function destroyUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
  }
  cookieStore.delete(sessionCookieName);
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });
  if (!session || session.expires < new Date()) {
    if (session) await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
    accountType: session.user.accountType,
    image: session.user.image,
  };
}

export async function requireUser(callbackUrl?: string) {
  const user = await getCurrentUser();
  if (!user) {
    const target = safeCallbackPath(callbackUrl);
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(target)}`);
  }
  return user;
}
