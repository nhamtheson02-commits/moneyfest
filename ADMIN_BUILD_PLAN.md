# MONEYFEST Admin Phase 2 Build Plan

## Audit Notes

- Current admin has `/admin` only, with a protected server-side Basic Auth gate in `proxy.ts`.
- Admin layout is already separate from public header/footer.
- Prisma uses PostgreSQL.
- `Lead` has `note` but does not yet have `status`.
- `ConsultationRequest` already has `status`.
- Existing public blog rendering uses `SafeBlogContent`, not raw unsanitized HTML.

## Implementation Plan

1. Add safe admin schema support:
   - Add `Lead.status` with default `new`.
   - Keep PostgreSQL provider.
   - Generate Prisma client after schema change.

2. Add admin data/actions layer:
   - Create typed admin query helpers.
   - Create Zod-validated server actions for Lead, Ebook, Post, Category, Tag, Consultation, Setting.
   - Add CSV export route for leads.

3. Build admin UI:
   - Upgrade admin layout navigation.
   - Keep `/admin` dashboard.
   - Add `/admin/leads`, `/admin/ebooks`, `/admin/posts`, `/admin/categories`, `/admin/tags`, `/admin/consultations`, `/admin/tool-results`, `/admin/settings`.
   - Use server-rendered pages and server actions; no env access in Client Components.

4. UX and safety:
   - Tables use `thead`/`tbody`.
   - Search/filter/pagination via query params.
   - Clear empty states.
   - Admin remains noindex and protected.

5. Verification:
   - Run `npm install`.
   - Run `npx prisma generate`.
   - Run `npm run build`.
   - Create `ADMIN_PHASE_2_REPORT.md`.
   - Commit and push to `origin/main`.

## Out Of Scope

- Do not push production.
- Do not build a custom auth system beyond current Basic Auth.
- Do not edit secrets from the UI.
- Do not add static export.
