# MONEYFEST Design Audit

Pham vi da doc:
- `app/**/*`
- `components/**/*`
- `lib/**/*`
- `prisma/seed.ts`
- `docs/brand assets/**/*`

## Tong ket hien trang

UI Phase 1 hien dang dung palette mac dinh theo huong SaaS tai chinh nhe:
- `slate`
- `emerald`
- `sky`
- `rose`
- `amber`
- `white`

Dieu nay chua khop brand guideline MONEYFEST:
- Brand yeu cau Financial Wisdom Luxury: Obsidian Black, Midnight Navy, Heritage Gold, Champagne Gold, Ivory, Slate Gray.
- Font heading hien tai la system sans, chua dung SVN-Georgia.
- Body hien tai la Arial/system sans, chua dung Inter/fallback theo guideline.
- Logo header/footer hien tai la icon lucide + text, chua dung logo brand.
- Ebook cover hien tai dung gradient nhieu mau, khong khop palette.
- Copy hien tai khong dau tieng Viet o nhieu noi.
- Button/card/form chua dung design token chung.

## Audit chi tiet

| File | Component / Khu vuc | Hien trang | Can sua |
|---|---|---|---|
| `app/globals.css` | CSS root/theme | Hard-code `#f8fafc`, `#0f172a`, Arial, field emerald focus | Tao design tokens brand; khai bao `@font-face` SVN-Georgia; dung token cho field, focus, prose |
| `app/layout.tsx` | Root layout/metadata | Body dung `bg-slate-50 text-slate-900`; metadata chua co OG/manifest | Dung token background/foreground; them OG metadata/logo neu asset co |
| `components/site-shell.tsx` | Header | Icon `BarChart3` thay logo; bg white; text slate; CTA slate/emerald | Dung logo brand, black/navy/ivory/gold; nav/footer dung token |
| `components/site-shell.tsx` | Footer | Slate black, text khong dau, chua dung logo | Dung Obsidian/Midnight, logo brand, copy co dau |
| `components/ui.tsx` | SectionHeader | Eyebrow emerald, heading sans/slate | Heading SVN-Georgia, eyebrow gold uppercase, text gray token |
| `components/ui.tsx` | CTAButton | Variants dark/light hard-code slate/emerald | Tao button variants brand primary/secondary/gold/ghost |
| `components/ui.tsx` | EmptyState/StatCard | White card, slate border | Dung surface/border tokens, card style brand |
| `components/ui.tsx` | EbookCover | Gradient emerald/slate/amber/blue/rose | Loai gradient ngoai palette; dung obsidian/navy/ivory/gold motif |
| `components/ebook-download-form.tsx` | Form | Label/input slate/emerald/rose; copy khong dau | Dung form token, error danger, success token; copy tieng Viet co dau |
| `components/consultation-form.tsx` | Form | Slate/emerald; select default; copy khong dau | Dung form token; label co dau; CTA dat lich/sang loc dung tone Advisor |
| `components/tool-forms.tsx` | Cashflow/Quiz | Icon bg emerald/sky; button slate/emerald; copy khong dau | Dung icon motif brand, khong sky/emerald; copy co dau; result card brand |
| `app/page.tsx` | Home hero | White/slate/emerald, dashboard card generic | Chuyen sang premium financial wisdom hero: black/navy/gold/ivory, logo/tone brand |
| `app/page.tsx` | Home sections | Cards white/slate, icons emerald, CTA emerald | Refactor theo token; motif compass/north star/grid; copy co dau |
| `app/ebooks/page.tsx` | Ebook list | White cards, emerald badge | Token card/badge; ebook cover brand |
| `app/ebooks/[slug]/page.tsx` | Detail | Slate/emerald stats/form | Token; copy label co dau |
| `app/blog/page.tsx` | Blog list | Emerald category, slate tags | Gold category, tag token |
| `app/blog/[slug]/page.tsx` | Blog detail/prose | Emerald meta; prose custom slate | Brand prose style, heading serif |
| `app/tools/page.tsx` | Tools wrapper | Generic layout | Token section/container |
| `app/services/page.tsx` | Services | Emerald status, slate CTA block | Brand card/button/status, copy co dau |
| `app/contact/page.tsx` | Contact | White tips; copy khong dau | Brand advisory card, copy co dau |
| `app/admin/page.tsx` | Admin | White cards/slate table | Brand admin surface/table tokens; dynamic route da dung |
| `app/loading.tsx` | Loading state | Slate/white, copy khong dau | Brand loading with logo/emblem and Vietnamese text |
| `app/error.tsx` | Error state | Slate/white, copy khong dau | Brand alert/danger token; Vietnamese text |
| `app/sitemap.ts` | SEO | Base URL `https://moneyfest.local` | Can cap nhat domain production khi co |
| `app/robots.ts` | SEO | Sitemap local domain | Can cap nhat domain production khi co |
| `lib/data.ts` | Services/static copy | Copy khong dau, service tone MVP | Viet lai co dau, dung tone Sage/Advisor |
| `prisma/seed.ts` | Ebook/blog demo copy | Phan lon khong dau; noi dung chua hoan toan theo brand pillars | Viet lai co dau, thong nhat "ebook", "đăng ký", "tư vấn" |

## Noi dang su dung mau sac

Can thay:
- `emerald-*`
- `slate-*`
- `sky-*`
- `rose-*`
- `amber-*`
- `orange-*`
- `teal-*`
- hard-code CSS `#f8fafc`, `#0f172a`, `#cbd5e1`, `#047857`, `rgba(4, 120, 87, 0.12)`, `#334155`

Bang token moi se gom:
- `background`
- `foreground`
- `surface`
- `surface-elevated`
- `primary`
- `secondary`
- `accent`
- `accent-soft`
- `muted`
- `border`
- `success`
- `warning`
- `danger`

## Font

Hien tai:
- System sans/Arial.

Can sua:
- Heading: SVN-Georgia.
- Body: Inter/fallback sans. Vi khong co Inter asset local, dung fallback system sans tuong thich tieng Viet hoac import local neu font asset duoc bo sung sau.

## Button

Hien tai:
- Inline class tung component.
- Variants khong dong bo.

Can sua:
- Tao component/button class token dung chung.
- Primary: Obsidian/Midnight + Heritage Gold accent.
- Secondary: Ivory surface + Obsidian text + gold border.
- CTA copy ro, khong FOMO.

## Card

Hien tai:
- White card, slate border, hover shadow.

Can sua:
- Dung `surface`, `surface-warm`, `border`.
- Radius tiet che.
- Shadow nhe.
- Gold accent line/eyebrow thay emerald.

## Form

Hien tai:
- Field class trong CSS hard-code slate/emerald.
- Error rose.

Can sua:
- Field dung token border/surface/focus gold.
- Error danger `#B00020`.
- Message success dung mau chuc nang tiet che.

## Icon

Hien tai:
- Lucide icons generic, mau emerald/sky.

Can sua:
- Tiep tuc dung lucide nhung chon motif gan brand: Compass, Star, Circle, Landmark, ChartLine, Shield.
- Mau icon Heritage Gold/Midnight.
- Khong dung mau ngoai palette.

## Badge / Tag / Alert

Hien tai:
- Badge emerald/slate.

Can sua:
- Badge gold-soft, navy, ivory.
- Alert success/warning/danger theo token.

## Navbar / Footer

Hien tai:
- Header white, logo lucide.
- Footer slate.

Can sua:
- Header brand logo, ivory/black hoac obsidian.
- Footer obsidian/navy with gold accents.
- Mobile logo khong bi keo gian.

## Spacing / Radius / Shadow

Hien tai:
- Tailwind spacing tuong doi on, nhung khong co token layer.
- `rounded-lg`, `rounded-md`, `shadow-sm`, `shadow-xl`.

Can sua:
- Chuan hoa radius va shadow qua class/token CSS.
- Tranh shadow manh; khong shadow logo.

## Animation

Hien tai:
- Hover translate/shadow nhe.

Can sua:
- Giu animation tiet che, khong flashy.
- Focus state ro cho keyboard.

## SEO UI

Hien tai:
- Metadata co ban co.
- Chua co OG image/manifest.
- Logo favicon chua ap dung asset brand.

Can sua:
- Dung logo/emblem cho favicon/metadata neu co the.
- Them manifest neu phu hop.

## Hinh anh

Hien tai:
- Public van con SVG placeholder Next.
- UI khong dung brand image, chi dung gradient cover.

Can sua:
- Khong tu tao anh moi.
- Dung logo asset brand trong header/footer/favicon/OG neu phu hop.
- Liet ke placeholder con lai trong `COPY_AUDIT.md`/report.
