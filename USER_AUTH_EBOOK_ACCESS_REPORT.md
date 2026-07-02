# USER AUTH + EBOOK ACCESS REPORT

## 1. Branch đã tạo

- `feature/user-auth-ebook-access`

## 2. Auth stack đã dùng

- Custom email/password auth hiện có của MONEYFEST.
- Hash password bằng `crypto.scrypt`, không lưu plain password.
- Session lưu trong database qua model `Session`, cookie `httpOnly`.
- OAuth Google/Facebook triển khai bằng route server-side riêng:
  - `/auth/oauth/google`
  - `/auth/oauth/google/callback`
  - `/auth/oauth/facebook`
  - `/auth/oauth/facebook/callback`

Không dùng Auth.js trong task này để tránh refactor lớn vào hệ thống session đang chạy ổn.

## 3. Routes đã thêm/cập nhật

- Thêm `/auth/error`
- Thêm `/auth/oauth/[provider]`
- Thêm `/auth/oauth/[provider]/callback`
- Cập nhật `/auth/login`
- Cập nhật `/auth/register`
- Cập nhật `/account`
- Cập nhật `/account/profile`
- Cập nhật `/account/ebooks`
- Cập nhật `/ebooks/[slug]`
- Cập nhật `/admin/users`
- Cập nhật `/admin/ebooks`

## 4. Prisma schema thay đổi

- `User`
  - thêm `emailVerified`
  - thêm `image`
  - `passwordHash` chuyển thành optional để hỗ trợ OAuth user
  - thêm `accountType` mặc định `FREE`
  - thêm relation `accounts`, `ebookAccess`
- Thêm `Account`
- Thêm `VerificationToken`
- Thêm `EbookAccess`
- `Ebook`
  - thêm `previewContent`
  - thêm `accessLevel` mặc định `FREE`
  - giữ `price`, `fileUrl`, `status`

## 5. Env cần thêm trên Vercel

```env
DATABASE_URL=""
NEXT_PUBLIC_SITE_URL=""
NEXTAUTH_URL=""
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""
ADMIN_USERNAME=""
ADMIN_PASSWORD=""
```

`NEXTAUTH_SECRET` hiện là biến chuẩn bị cho auth/OAuth production và có thể dùng khi migrate sang Auth.js sau này.

## 6. Google OAuth setup cần làm

- Tạo OAuth app trong Google Cloud Console.
- Authorized redirect URI:
  - `https://moneyfest.vn/auth/oauth/google/callback`
  - hoặc domain Vercel preview tương ứng.
- Điền `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` trên Vercel.

## 7. Facebook OAuth setup cần làm

- Tạo app trong Meta for Developers.
- Valid OAuth redirect URI:
  - `https://moneyfest.vn/auth/oauth/facebook/callback`
  - hoặc domain Vercel preview tương ứng.
- Điền `FACEBOOK_CLIENT_ID` và `FACEBOOK_CLIENT_SECRET` trên Vercel.

## 8. Ebook access rules

- User chưa login:
  - Vẫn xem được trang chi tiết và preview ebook.
  - Khi muốn tải/xem file sẽ được đưa về `/auth/login?callbackUrl=/ebooks/[slug]`.
- User đã login:
  - `FREE` ebook: mọi tài khoản đăng nhập được tải.
  - `PAID` ebook: tài khoản `PAID`, `MEMBER`, `ADMIN` hoặc user có `EbookAccess` được tải.
  - `MEMBERSHIP` ebook: tài khoản `MEMBER`, `ADMIN` hoặc user có `EbookAccess` được tải.
  - Chưa có quyền: hiển thị CTA đăng ký tư vấn hoặc xem dịch vụ.
- Khi tải thành công:
  - Tạo/cập nhật `Lead` theo email user.
  - Ghi `EbookDownload`.

## 9. Admin support đã thêm

- `/admin/users`
  - Search theo tên/email/role/accountType.
  - Hiển thị `accountType`.
  - Cho đổi `accountType`: `FREE`, `PAID`, `MEMBER`, `ADMIN`.
  - Cho cấp quyền ebook theo `EbookAccess`: `FREE`, `PURCHASED`, `GRANTED`, `MEMBERSHIP`.
- `/admin/ebooks`
  - Cho cấu hình `accessLevel`: `FREE`, `PAID`, `MEMBERSHIP`.
  - Cho nhập `previewContent`.

## 10. File đã sửa/tạo

- `.env.example`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/auth.ts`
- `lib/auth-actions.ts`
- `lib/oauth.ts`
- `lib/ebook-access.ts`
- `lib/ebook-access-actions.ts`
- `lib/admin-actions.ts`
- `lib/admin-data.ts`
- `lib/admin-validation.ts`
- `components/auth-form.tsx`
- `components/ebook-access-panel.tsx`
- `app/auth/error/page.tsx`
- `app/auth/oauth/[provider]/route.ts`
- `app/auth/oauth/[provider]/callback/route.ts`
- `app/auth/login/page.tsx`
- `app/auth/register/page.tsx`
- `app/account/page.tsx`
- `app/account/profile/page.tsx`
- `app/account/ebooks/page.tsx`
- `app/ebooks/[slug]/page.tsx`
- `app/admin/users/page.tsx`
- `app/admin/ebooks/page.tsx`

## 11. Cách chạy local

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

Truy cập:

- `http://localhost:3000`
- `http://localhost:3000/auth/login`
- `http://localhost:3000/auth/register`
- `http://localhost:3000/account`
- `http://localhost:3000/ebooks`
- `http://localhost:3000/admin/users`

## 12. Kết quả npm run build

- `npm run build`: thành công.
- Lưu ý: build trong sandbox bị Turbopack chặn bind port nội bộ. Chạy lại ngoài sandbox đã pass.

## 13. Việc chưa làm

- Chưa triển khai payment thật.
- Chưa triển khai reset password qua email.
- Chưa triển khai email verification.
- Chưa migrate sang Auth.js/Prisma Adapter.
- Chưa có màn hình revoke/xóa quyền ebook đã cấp.
- OAuth chỉ hoạt động sau khi owner cấu hình Google/Facebook app và env production.

## 14. Cách test login/register/ebook access

1. Chạy `npx prisma db push`.
2. Chạy `npx prisma db seed`.
3. Vào `/auth/register`, tạo tài khoản mới.
4. Vào ebook FREE, bấm tải/xem ebook.
5. Vào ebook PAID hoặc MEMBERSHIP, kiểm tra CTA chưa có quyền.
6. Vào `/admin/users`, đổi `accountType` thành `PAID` hoặc `MEMBER`, hoặc cấp quyền ebook riêng.
7. Quay lại trang ebook và kiểm tra tải/xem được.
8. Nếu muốn test OAuth, cấu hình client id/secret và redirect URI tương ứng rồi bấm Google/Facebook trên trang login/register.
