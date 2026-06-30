# NETLIFY BUILD TYPE FIX REPORT

## Nguyên nhân lỗi

Netlify build fail vì TypeScript không suy luận được kiểu cho dữ liệu admin dashboard khi render:

```tsx
data.leads.map((lead) => ...)
```

Nguyên nhân gốc nằm ở `getAdminData()`: object `fallback` dùng các mảng rỗng `[]` nhưng không có type rõ ràng, khiến dữ liệu trả về có thể bị suy luận không đủ chặt trong môi trường build.

## File đã sửa

- `lib/data.ts`

## Type đã thêm

Đã dùng Prisma generated types, không dùng `any`:

- `PostWithRelations`
- `EbookWithDownloadCount`
- `AdminDownload`
- `AdminDashboardData`

Các hàm data được khai báo return type rõ ràng:

- `getHomeData()`
- `getEbooks()`
- `getEbookBySlug()`
- `getPosts()`
- `getPostBySlug()`
- `getAdminData()`

`getAdminData()` hiện trả về `Promise<AdminDashboardData>`, trong đó:

- `leads: Lead[]`
- `downloads: AdminDownload[]`
- `consultations: ConsultationRequest[]`

## Kết quả npm run build

Đã chạy:

```bash
npm run build
```

Kết quả: thành công.

```text
✔ Generated Prisma Client (v7.8.0)
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages (16/16)
```

Ghi chú: build vẫn có warning từ `pg` về `sslmode=require`, nhưng đây không phải lỗi TypeScript và không làm fail build.
