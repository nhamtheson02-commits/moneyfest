# MONEYFEST Vercel Deploy Guide

## Deploy Target

- Dev repo: `https://github.com/JasonBui1285/moneyfest`
- Production repo: `https://github.com/nhamtheson02-commits/moneyfest`
- Vercel deploys from the production repo.
- Framework preset: Next.js.
- Build command: `npm run build`.
- Static export: not used.

## Required Vercel Environment Variables

Set these in Vercel Project Settings:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"
ADMIN_USERNAME="replace-with-owner-login"
ADMIN_PASSWORD="replace-with-long-random-password"
```

`NEXT_PUBLIC_SITE_URL` is public by design. `DATABASE_URL` and `ADMIN_PASSWORD` are server secrets.

## Optional Variables

Optional integrations can stay empty until configured:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
NEXT_PUBLIC_CLARITY_PROJECT_ID=""
NEXT_PUBLIC_SENTRY_DSN=""
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

## First Deploy Checklist

- Connect Vercel to `nhamtheson02-commits/moneyfest`.
- Select the Next.js framework preset.
- Keep build command as `npm run build`.
- Do not enable static export.
- Add required env variables.
- Confirm Neon PostgreSQL allows connections from Vercel.
- Run `npx prisma db push` against production database before launch if tables do not exist.
- Seed demo content only when owner approves production seed data.

## Local Verification Before Sync

Run in the dev repo:

```bash
npm install
npx prisma generate
npm run build
git status
```
