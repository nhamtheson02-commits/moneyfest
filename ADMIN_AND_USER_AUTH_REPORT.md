# MONEYFEST Admin And User Auth Report

## 1. Branch đã tạo

```text
feature/admin-user-auth
```

Task được làm trên branch riêng, không sửa trực tiếp `main`.

## 2. Routes admin đã thêm/nâng cấp

- `/admin`
- `/admin/leads`
- `/admin/leads/export`
- `/admin/consultations`
- `/admin/ebooks`
- `/admin/posts`
- `/admin/categories`
- `/admin/tags`
- `/admin/tool-results`
- `/admin/users`
- `/admin/settings`

Admin layout đã được nâng cấp:

- Sidebar cố định desktop.
- Mobile drawer bằng native `details`.
- Top bar có search nhanh, notification indicator, account indicator.
- Không dùng public header/footer.
- Basic Auth hiện tại vẫn giữ server-side.
- Admin routes tiếp tục `noindex`.

## 3. Routes auth/account đã thêm

- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/account`
- `/account/profile`
- `/account/ebooks`

User account Phase 1:

- Đăng ký email + password.
- Đăng nhập email + password.
- Logout.
- Redirect `/account` về `/auth/login` nếu chưa đăng nhập.
- Hiển thị ebook đã tải theo email.
- Hiển thị quiz/tool results theo email.
- Hiển thị consultation requests theo email.
- Cập nhật tên profile.

## 4. Prisma schema thay đổi

Thêm model:

- `User`
- `Session`

Nâng cấp model hiện có:

- `Lead.assignedTo`
- `Ebook.status`
- `Ebook.price`
- `Post.status`
- `Post.seoTitle`
- `Post.seoDescription`

Các field cũ như `Lead.status`, `Lead.note`, `ConsultationRequest.status`, `Ebook.fileUrl` vẫn được giữ.

PostgreSQL vẫn là datasource:

```prisma
provider = "postgresql"
```

## 5. Actions/API đã tạo

Auth/user:

- `loginAction`
- `registerAction`
- `forgotPasswordAction`
- `logoutAction`
- `updateProfileAction`

Admin:

- Lead status/note update.
- Ebook create/update/delete/archive fallback.
- Post create/update/delete.
- Category create/update/delete.
- Tag create/update/delete.
- Consultation status update.
- Setting create/update/delete.
- Lead CSV export route.

Security:

- Password được hash bằng `crypto.scrypt`.
- Không lưu plain password.
- Session token random lưu trong DB và httpOnly cookie.
- Không expose password/hash ra client.
- Không import env vào Client Components.

## 6. File đã sửa/tạo

- `prisma/schema.prisma`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/users/page.tsx`
- `app/auth/login/page.tsx`
- `app/auth/register/page.tsx`
- `app/auth/forgot-password/page.tsx`
- `app/account/layout.tsx`
- `app/account/page.tsx`
- `app/account/profile/page.tsx`
- `app/account/ebooks/page.tsx`
- `components/auth-form.tsx`
- `components/site-shell.tsx`
- `lib/auth.ts`
- `lib/auth-actions.ts`
- `lib/auth-validation.ts`
- `lib/admin-data.ts`
- `lib/admin-validation.ts`
- `ADMIN_AND_USER_AUTH_REPORT.md`

## 7. Cách chạy local

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Truy cập:

```text
http://localhost:3000/auth/register
http://localhost:3000/auth/login
http://localhost:3000/account
http://localhost:3000/admin
```

## 8. Env cần có

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_USERNAME="replace-with-owner-login"
ADMIN_PASSWORD="replace-with-long-random-password"
```

Không cần thêm env mới cho custom auth Phase 1 vì session token lưu DB và cookie httpOnly.

## 9. Kết quả npm run build

Đã chạy và pass:

```text
npm install: pass
npx prisma generate: pass
npm run build: pass
```

Route output xác nhận:

- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/account`
- `/account/profile`
- `/account/ebooks`
- `/admin/users`

## 10. Việc còn lại

- Chưa có email reset password thật.
- Chưa có role-based admin auth đầy đủ.
- Chưa có OAuth/Auth.js.
- Chưa có orders/payment/membership.
- Chưa liên kết trực tiếp userId với lead/download/tool result; hiện account match theo email.
- Chưa chạy `prisma db push` trên production database.

## 11. Cách sync sang production repo

Chỉ sync sau khi owner xác nhận:

```bash
npm run build
git status
./scripts/sync-production.sh
```

Không push production trong task này.
