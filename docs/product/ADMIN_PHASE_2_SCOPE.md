# MONEYFEST Admin Phase 2 Scope

Admin Phase 2 should be implemented after the dev-to-production repo sync is stable.

## Scope

- Admin login/protection
- Dashboard tổng quan
- Quản lý Lead
- Quản lý Ebook
- Quản lý Blog Post
- Quản lý Category/Tag
- Quản lý ConsultationRequest
- Quản lý ToolResult
- Export CSV
- Search/filter/pagination
- Lead status pipeline
- Audit log
- Không index admin
- Không public admin

## Notes

- Do not build large CRUD modules until repo sync and Vercel deployment are stable.
- Keep admin routes server-protected.
- Do not expose admin links in public navigation.
- Prefer small, auditable increments with build checks after each change.
