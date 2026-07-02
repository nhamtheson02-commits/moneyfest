# VERCEL MIGRATION REPORT

## Audit Summary

- Checked `package.json`: build command is `prisma generate && next build`.
- Checked `next.config.ts`: Next.js config wraps Sentry config and does not use static export.
- Checked `prisma/schema.prisma`: datasource provider is `postgresql`.
- Checked admin protection: `/admin` is protected in `proxy.ts` with Basic Auth server-side.
- Checked `.env.example`: uses placeholders, no real secrets.
- Checked deploy docs: Netlify docs were present in the repo root.
- Checked remotes: `origin` points to `JasonBui1285/moneyfest`; production remote should point to `nhamtheson02-commits/moneyfest`.

## Netlify Cleanup

Moved Netlify docs to:

```text
docs/archive/netlify/
```

No `netlify.toml` was found in the project root.

## Vercel Documentation Created

- `docs/deployment/VERCEL_DEPLOY_GUIDE.md`
- `docs/deployment/VERCEL_ENVIRONMENT.md`
- `docs/deployment/REPO_SYNC_GUIDE.md`
- `REPO_STRATEGY.md`
- `PROJECT_CONTEXT.md`
- `docs/product/ADMIN_PHASE_2_SCOPE.md`

## Prisma/PostgreSQL

Current Prisma datasource:

```prisma
datasource db {
  provider = "postgresql"
}
```

Production database should be Neon PostgreSQL via `DATABASE_URL`.

## Required Vercel Env

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"
ADMIN_USERNAME="replace-with-owner-login"
ADMIN_PASSWORD="replace-with-long-random-password"
```

## Sync To Production Repo

Dev repo:

```text
https://github.com/JasonBui1285/moneyfest
```

Production repo:

```text
https://github.com/nhamtheson02-commits/moneyfest
```

Add production remote:

```bash
git remote add production https://github.com/nhamtheson02-commits/moneyfest.git
```

Sync script:

```bash
./scripts/sync-production.sh
```

This task does not push to production.

## Windows Team Commands

```powershell
git checkout main
git pull origin main
npm install
npx prisma generate
npm run build
git remote add production https://github.com/nhamtheson02-commits/moneyfest.git
git push production main
```

If the remote already exists:

```powershell
git remote set-url production https://github.com/nhamtheson02-commits/moneyfest.git
```

## Build Result

Verified successfully.

```text
npm install: pass
npx prisma generate: pass
npm run build: pass
```

Build output confirmed Next.js routes compile successfully. Warning from `pg` about `sslmode=require` remains informational and does not fail the build.

## Next Admin Work

Next step is Admin Phase 2 planning and implementation:

- Admin login/protection
- Dashboard tổng quan
- CRUD for Lead, Ebook, Blog Post, Category/Tag
- ConsultationRequest and ToolResult management
- Export CSV
- Search/filter/pagination
- Lead status pipeline
- Audit log
