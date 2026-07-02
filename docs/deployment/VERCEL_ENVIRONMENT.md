# MONEYFEST Vercel Environment

## Public Variables

Variables prefixed with `NEXT_PUBLIC_` are browser-visible in Next.js.

Required:

```env
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"
```

Optional:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
NEXT_PUBLIC_CLARITY_PROJECT_ID=""
NEXT_PUBLIC_SENTRY_DSN=""
```

## Server Secrets

These values must be stored only in Vercel environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
ADMIN_PASSWORD="replace-with-long-random-password"
```

## Server Config

These are server-side config values:

```env
ADMIN_USERNAME="replace-with-owner-login"
```

## Optional Server Integrations

These can remain empty until the corresponding integration is active:

```env
BREVO_API_KEY=""
BREVO_SENDER_EMAIL=""
BREVO_SENDER_NAME="MONEYFEST"
BREVO_OWNER_EMAIL=""
BREVO_LIST_ID=""
SENTRY_DSN=""
SENTRY_ORG=""
SENTRY_PROJECT=""
SENTRY_AUTH_TOKEN=""
```

## Notes

- `NEXT_PUBLIC_SITE_URL` is not a secret.
- `DATABASE_URL` must point to Neon PostgreSQL in production.
- Do not commit `.env`.
- Do not copy real production secrets into docs, reports, or screenshots.
