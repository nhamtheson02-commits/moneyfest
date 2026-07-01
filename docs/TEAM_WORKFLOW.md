# Quy trình làm việc nhóm MoneyFest

## Vai trò

| Vai trò | GitHub | Netlify | Trách nhiệm |
|---|---|---|---|
| Owner | Admin | Owner | Thành viên, domain, biến bí mật, bản production |
| Developer | Write | Developer | Sửa mã, Pull Request, log và preview |
| Content Editor | Triage hoặc Write | Reviewer nếu cần | Nội dung và hình ảnh |
| Reviewer | Maintain | Reviewer | Duyệt nội dung, giao diện và chất lượng |

Chỉ nên có 1–2 Owner. Mỗi người dùng tài khoản riêng; không chia sẻ mật khẩu.

## Nhánh

- `main`: phiên bản đang chạy thật; không sửa trực tiếp.
- `feature/ten-tinh-nang`: tính năng mới.
- `fix/ten-loi`: sửa lỗi.
- `content/chu-de`: nội dung hoặc hình ảnh.

## Luồng làm việc

1. Tạo Issue mô tả việc cần làm.
2. Tạo nhánh mới từ `main`.
3. Sửa và mở Pull Request.
4. Kiểm tra link Deploy Preview của Netlify.
5. Owner hoặc Reviewer duyệt.
6. Gộp vào `main`; Netlify tự build và cập nhật website.

## Quy tắc bảo vệ `main`

Tạo GitHub Ruleset áp dụng cho `main`:

- Bắt buộc Pull Request.
- Ít nhất 1 lượt duyệt.
- Hủy lượt duyệt cũ khi có commit mới.
- Bắt buộc kiểm tra Netlify thành công.
- Chặn force push và xóa `main`.
- Áp dụng quy tắc cả với Owner.

## Kiểm tra trước khi gửi duyệt

```bash
npm run lint
npm run build
```

Nếu sửa Prisma schema:

```bash
npx prisma generate
```

Không chạy `prisma db push` vào production nếu chưa có Owner duyệt và sao lưu phù hợp.

## Dữ liệu bí mật

Các biến sau chỉ được lưu trong `.env` cá nhân hoặc Netlify Environment variables:

- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Không gửi chúng qua Issue, Pull Request, ảnh chụp màn hình hoặc commit.

