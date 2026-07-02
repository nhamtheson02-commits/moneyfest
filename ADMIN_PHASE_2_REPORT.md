# MONEYFEST Admin Phase 2 Report

## Tính năng admin đã hoàn thành

- Admin layout riêng, không dùng public header/footer.
- Admin navigation cho dashboard và các module quản trị.
- Basic Auth hiện tại được giữ ở `proxy.ts`, chạy server-side.
- Dashboard tổng quan với lead, ebook download, consultation và post.
- Lead management: list, search, status pipeline, note, pagination, CSV export.
- Ebook management: list, search, create, update, delete/archive fallback, pagination.
- Blog management: CRUD post, category, tag, search và pagination.
- Consultation management: list, search/filter, status update, xem message.
- Tool results: list, search, filter theo `toolType`.
- Settings: key/value CRUD cơ bản, không cho quản lý secret/password từ UI.
- Admin routes có metadata `robots: noindex`.

## Routes đã tạo

- `/admin`
- `/admin/leads`
- `/admin/leads/export`
- `/admin/ebooks`
- `/admin/posts`
- `/admin/categories`
- `/admin/tags`
- `/admin/consultations`
- `/admin/tool-results`
- `/admin/settings`

## Prisma schema thay đổi

Thêm vào `Lead`:

```prisma
status String @default("new")
```

Thêm index:

```prisma
@@index([status])
```

Datasource vẫn là PostgreSQL:

```prisma
provider = "postgresql"
```

## Server actions/API đã tạo

Server actions trong `lib/admin-actions.ts`:

- `updateLeadAction`
- `saveEbookAction`
- `deleteEbookAction`
- `savePostAction`
- `deletePostAction`
- `saveCategoryAction`
- `deleteCategoryAction`
- `saveTagAction`
- `deleteTagAction`
- `updateConsultationAction`
- `saveSettingAction`
- `deleteSettingAction`

API/route handler:

- `app/admin/leads/export/route.ts`

## File đã sửa/tạo

- `ADMIN_BUILD_PLAN.md`
- `ADMIN_PHASE_2_REPORT.md`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/leads/page.tsx`
- `app/admin/leads/export/route.ts`
- `app/admin/ebooks/page.tsx`
- `app/admin/posts/page.tsx`
- `app/admin/categories/page.tsx`
- `app/admin/tags/page.tsx`
- `app/admin/consultations/page.tsx`
- `app/admin/tool-results/page.tsx`
- `app/admin/settings/page.tsx`
- `components/admin-action-form.tsx`
- `components/admin-ui.tsx`
- `lib/admin-actions.ts`
- `lib/admin-constants.ts`
- `lib/admin-data.ts`
- `lib/admin-utils.ts`
- `lib/admin-validation.ts`
- `prisma/schema.prisma`

## Cách chạy local

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Mở:

```text
http://localhost:3000/admin
```

## Env cần có

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_USERNAME="replace-with-owner-login"
ADMIN_PASSWORD="replace-with-long-random-password"
```

## Kết quả npm run build

Đã chạy và pass:

```text
npm install: pass
npx prisma generate: pass
npm run build: pass
```

Route output xác nhận các admin routes là dynamic server-rendered.

## Việc chưa làm

- Chưa tạo hệ thống auth user/role đầy đủ, vẫn dùng Basic Auth.
- Chưa thêm audit log model.
- Chưa có UI confirm modal nâng cao cho thao tác xóa.
- Chưa push production.
- Chưa chạy `prisma db push` lên production database.

## Bước tiếp theo trước khi sync production

1. Chạy lại:

```bash
npm run build
git status
```

2. Apply schema lên database đích:

```bash
npx prisma db push
```

3. Khi owner xác nhận, sync sang production repo:

```bash
./scripts/sync-production.sh
```
