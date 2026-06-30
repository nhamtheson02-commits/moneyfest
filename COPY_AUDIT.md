# MONEYFEST Copy Audit

## Phạm vi kiểm tra

Đã rà soát copy hiển thị trong:
- Header, footer, navigation.
- Trang chủ.
- Ebook list và ebook detail.
- Blog list và blog detail.
- Tools: công cụ dòng tiền và quiz sức khỏe tài chính.
- Services.
- Contact.
- Admin.
- Loading, error state.
- Form label, placeholder, validation message, success/error message.
- Seed data cho ebook, blog, category, tag.

## Quy chuẩn copy đã áp dụng

- Tên thương hiệu: `MONEYFEST`.
- Thuật ngữ chính: `ebook`, `blog`, `công cụ`, `dịch vụ`, `tư vấn`, `đặt lịch sàng lọc`, `dòng tiền`, `sức khỏe tài chính`.
- Cách viết thống nhất: `Đăng ký`, không dùng `Đăng kí`.
- Cách viết thống nhất: `ebook`, không dùng `E-book` hoặc `E Book`.
- CTA ưu tiên rõ hành động, không tạo FOMO: `Tải ebook`, `Đăng ký tư vấn`, `Làm quiz`, `Mở công cụ`, `Đặt lịch sàng lọc`.
- Tránh các tuyên bố không phù hợp brand: không cam kết lợi nhuận, không “phím hàng”, không thúc ép làm giàu nhanh.

## Vấn đề đã phát hiện

| Khu vực | Vấn đề | Trạng thái |
|---|---|---|
| Form tải ebook | Copy cũ thiếu dấu tiếng Việt, thông báo lỗi chưa đồng bộ | Đã sửa |
| Form tư vấn | Label, placeholder, option và validation message chưa thống nhất thuật ngữ | Đã sửa |
| Tools | Kết quả quiz/dòng tiền có copy kỹ thuật và chưa theo tone Advisor | Đã sửa |
| Services | `Coming soon` hiển thị trong UI | Đã đổi thành `Sắp ra mắt` |
| Home | Nhãn `Lead magnet` chưa thuần tiếng Việt | Đã đổi thành `Tài nguyên` |
| Ebook cover | Nhãn `MONEYFEST Ebook` chưa đúng trật tự tiếng Việt | Đã đổi thành `Ebook MONEYFEST` |
| Seed data | Bài blog/ebook demo cũ thiếu dấu và chưa theo brand pillars | Đã viết lại |
| SEO metadata | Domain local trong metadata/sitemap/robots | Đã đổi sang `https://www.moneyfest.vn` |

## Kết quả rà soát tiếng Việt

- Heading, button, label, placeholder, menu, CTA, footer và admin đã dùng tiếng Việt có dấu.
- Không phát hiện copy user-facing dạng `dang ky`, `tu van`, `tai ebook`, `coming soon` sau refactor.
- Các chuỗi tiếng Anh còn lại là chủ đích hoặc nằm trong ngữ cảnh kỹ thuật/sản phẩm: `Admin`, `Blog`, `Phase 1`, URL slug, tên model Prisma, tên biến code.
- Font heading dùng `SVN-Georgia`; body dùng `Inter` fallback stack. Cần bổ sung file Inter local nếu muốn khóa tuyệt đối body font theo guideline.

## Hạn chế còn lại

- Một số nội dung demo vẫn là seed content, chưa phải bài biên tập cuối cùng từ team content.
- `Admin` và `Blog` được giữ vì là thuật ngữ sản phẩm phổ biến, có thể Việt hóa thành `Quản trị` và `Bài viết` nếu owner muốn tone thuần Việt hơn.
- Không có brand image trong `docs/brand assets/IMAGES`, nên phần image copy chỉ kiểm tra trên logo và visual motif hiện có.
