# MONEYFEST UI Refactor Report

## Tóm tắt

Đã refactor website MONEYFEST Phase 1 theo Brand Guideline và Brand Identity hiện có. Trọng tâm là chuyển toàn bộ UI sang hệ nhận diện `Financial Wisdom Luxury`: Obsidian Black, Midnight Navy, Heritage Gold, Champagne Gold, Ivory, typography serif cho heading, logo thật, tone copy bình tĩnh và advisor-oriented.

## File đã sửa hoặc tạo

### Brand, SEO, global

- `app/globals.css`
- `app/layout.tsx`
- `app/manifest.ts`
- `app/icon.png`
- `app/sitemap.ts`
- `app/robots.ts`
- `public/brand/fonts/*`
- `public/brand/logo/*`
- `BRAND_ANALYSIS.md`
- `DESIGN_AUDIT.md`
- `COPY_AUDIT.md`
- `UI_REFACTOR_REPORT.md`

### Component

- `components/site-shell.tsx`
- `components/ui.tsx`
- `components/ebook-download-form.tsx`
- `components/consultation-form.tsx`
- `components/tool-forms.tsx`

### Page

- `app/page.tsx`
- `app/ebooks/page.tsx`
- `app/ebooks/[slug]/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/tools/page.tsx`
- `app/services/page.tsx`
- `app/contact/page.tsx`
- `app/admin/page.tsx`
- `app/loading.tsx`
- `app/error.tsx`

### Data, validation, database

- `lib/actions.ts`
- `lib/data.ts`
- `lib/validation.ts`
- `prisma/schema.prisma`
- `prisma/setup-dev-db.ts`
- `prisma/seed.ts`

## Component đã refactor

- Header: dùng logo brand, nav tokenized, CTA rõ.
- Footer: dùng emblem/logo, tone brand, copy không FOMO.
- SectionHeader: heading serif, eyebrow gold.
- Button: `primary`, `secondary`, `gold`, `ghost`.
- Card: surface/ivory, border nhẹ, radius tiết chế.
- EbookCover: bỏ gradient màu cũ, dùng obsidian/navy/gold motif.
- Form: label/input/error/success dùng token chung.
- Tool result: dùng alert/card token, copy tiếng Việt.
- Admin stats/table: dùng surface/table token, đọc data thật từ Prisma.
- Loading/error state: dùng màu, copy và focus state brand.

## Design token mới

### Colors

- `--mf-obsidian`: `#070707`
- `--mf-midnight`: `#071521`
- `--mf-gold`: `#D4A83F`
- `--mf-champagne`: `#E8CF8B`
- `--mf-ivory`: `#F4F0E8`
- `--mf-slate`: `#66717A`
- `--mf-line`: `#D7D7D7`
- `--mf-danger`: `#B00020`
- `--mf-success`: functional green, chỉ dùng cho trạng thái
- `--mf-background`, `--mf-foreground`, `--mf-surface`, `--mf-surface-warm`, `--mf-border`, `--mf-muted`

### Typography

- Heading/display: `SVN-Georgia`.
- Body: `Inter, Aptos, Segoe UI, Arial, Helvetica, sans-serif`.
- Body tối thiểu 16px cho nội dung chính.
- Letter spacing chỉ dùng cho micro label/eyebrow uppercase.

### Radius, shadow, spacing

- Radius: `--mf-radius-sm`, `--mf-radius-md`, `--mf-radius-lg`.
- Shadow: `--mf-shadow-soft`, `--mf-shadow-card`, dùng nhẹ, không dùng cho logo.
- Container/section: `.mf-container`, `.mf-section`, `.mf-section-compact`.

### UI classes

- Button: `.mf-btn`, `.mf-btn-primary`, `.mf-btn-secondary`, `.mf-btn-gold`, `.mf-btn-ghost`.
- Form: `.mf-field`, `.mf-label`, `.mf-error-text`.
- Card: `.mf-card`, `.mf-card-dark`.
- Badge/tag: `.mf-badge`, `.mf-tag`.
- Alert: `.mf-success-alert`, `.mf-info-alert`.
- Table: `.mf-table`.
- Prose: `.prose-moneyfest`.

## Font đang dùng

- `SVN-Georgia` được self-host từ `docs/brand assets/FONTS`.
- Không tìm thấy file Inter trong brand assets. Body dùng fallback stack theo guideline để chạy local ổn định, không phụ thuộc network.
- Cần bổ sung Inter self-host nếu production bắt buộc đúng 100% font body.

## Màu đang dùng

Website hiện dùng palette brand chính: Obsidian Black, Midnight Navy, Heritage Gold, Champagne Gold, Ivory, Slate Gray. Các màu ngoài brand cũ như emerald/sky/rose/amber/teal không còn được dùng trong component/page UI.

## Hình ảnh và logo

- Header, footer, favicon, manifest icon và Open Graph image đã dùng logo/emblem brand.
- Logo không bị recolor bằng CSS, không thêm shadow/glow, không kéo giãn.
- `docs/brand assets/IMAGES` và `docs/brand assets/ICONS` đang trống.
- Không tự tạo ảnh mới theo yêu cầu.
- Các SVG mặc định của Next.js vẫn còn trong `public/` nhưng không được dùng trong UI.

## Accessibility

- Body text giữ tối thiểu 16px.
- Button/input có focus state rõ bằng gold outline/ring.
- CTA có kích thước đủ lớn.
- Dark sections dùng Ivory/Champagne text để giữ contrast.
- Các bảng admin giữ header và row spacing dễ đọc.

## Responsive

Đã thiết kế lại bằng grid/flex responsive cho mobile, tablet và desktop:
- Header mobile tự wrap CTA/nav.
- Home hero chuyển từ một cột sang hai cột từ desktop.
- Ebook/blog/service cards dùng `md:grid-cols-*`.
- Admin table có vùng `overflow-x-auto`.
- Form và tools giữ single-column trên mobile.

## SEO UI

- Metadata cho home, ebook, blog, services, tools, contact/admin vẫn còn.
- `metadataBase`, sitemap và robots đã đổi sang `https://www.moneyfest.vn`.
- Open Graph image dùng logo brand.
- Favicon/app icon dùng emblem brand.
- Manifest đã thêm cho install metadata cơ bản.
- Các route top-level đã có đúng 1 H1.

## Vấn đề đã xử lý

- Đồng bộ palette và bỏ màu cũ trong UI.
- Áp dụng logo thật thay icon placeholder.
- Việt hóa copy thiếu dấu.
- Chuẩn hóa thuật ngữ `ebook`, `Đăng ký`, `tư vấn`, `Sắp ra mắt`.
- Cập nhật seed data tiếng Việt.
- Cập nhật validation message/action response tiếng Việt.
- Build và lint đã được đưa về trạng thái pass trong quá trình refactor.
- Sửa lỗi SEO UI sau QA: các trang list/top-level trước đó dùng heading lớn là `h2`; hiện đã dùng `h1`.

## Kiểm tra cuối

- `npm run lint`: pass.
- `npm run build`: pass.
- Route smoke test trên local: `/`, `/ebooks`, `/blog`, `/tools`, `/services`, `/contact`, `/admin`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` đều trả `200`.
- Browser console: không có error.
- Responsive viewport đã kiểm tra: `320`, `375`, `390`, `430`, `768`, `1024`, `1280`, `1440`.
- Kết quả responsive: không phát hiện horizontal overflow trên trang chủ ở các viewport trên.
- Typography render check: H1 dùng `SVN Georgia`; body dùng fallback stack `Inter, Aptos, Segoe UI, Arial, Helvetica, sans-serif`.

## Vấn đề chưa xử lý hoặc cần quyết định thêm

- Chưa có file Inter trong brand assets; body font hiện dùng fallback stack.
- Chưa có bộ icon riêng; đang dùng lucide icon theo motif guideline.
- Chưa có hình ảnh thương hiệu trong thư mục `IMAGES`; UI hiện dùng logo, motif CSS và ebook cover hệ thống.
- Guideline không nêu cụ thể spacing/radius/shadow cho web UI, nên token được thiết kế bảo thủ dựa trên tinh thần brand.
- Admin Phase 1 chưa có login theo đúng phạm vi MVP trước đó.
- Nội dung seed vẫn là nội dung demo, cần biên tập cuối trước public launch.
