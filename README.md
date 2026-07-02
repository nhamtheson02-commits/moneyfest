# MONEYFEST

MONEYFEST là website chính thức xây bằng Next.js App Router, TypeScript, Tailwind CSS, Prisma và PostgreSQL/Neon.

## Repo Workflow

- Repo dev/Codex: `https://github.com/JasonBui1285/moneyfest`
- Repo production: `https://github.com/nhamtheson02-commits/moneyfest`
- Production deploy bằng Vercel từ repo production.
- Không dùng static export.
- Mỗi thay đổi cần `npm run build` pass trước khi commit/push.

Xem thêm:

- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- [REPO_STRATEGY.md](./REPO_STRATEGY.md)
- [Vercel deploy guide](./docs/deployment/VERCEL_DEPLOY_GUIDE.md)
- [Environment guide](./docs/deployment/VERCEL_ENVIRONMENT.md)
- [Repo sync guide](./docs/deployment/REPO_SYNC_GUIDE.md)

## Chạy Local

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

Mở:

```text
http://localhost:3000
```

## Database

Production dùng PostgreSQL/Neon qua Prisma.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
```

Không hard-code secret trong source code. Không commit `.env`, `dev.db`, `.next` hoặc `.netlify`.

## Environment

Các biến bắt buộc cho Vercel:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Các biến analytics/email/Sentry là optional và có placeholder trong `.env.example`.

## Quản Trị

Route `/admin` được bảo vệ bằng Basic Auth phía server. Khu vực admin không index và không public.

## Kiểm Tra

```bash
npm run build
git status
```
