# MONEYFEST Repo Strategy

## Repositories

- Dev/Codex repo: `https://github.com/JasonBui1285/moneyfest`
- Production repo: `https://github.com/nhamtheson02-commits/moneyfest`

## Rules

- All development work starts in the dev repo.
- Vercel deploys only from the production repo.
- Do not push to production until `npm run build` passes in dev.
- Do not use static export.
- Do not commit `.env`, `dev.db`, `.next`, `.netlify`, or real secrets.

## Production Sync

Production sync is a deliberate step after review:

```bash
./scripts/sync-production.sh
```

This task prepares the script and docs only. It does not push to production.

## Admin Phase 2

Admin CRUD should be planned and scoped before implementation. See `docs/product/ADMIN_PHASE_2_SCOPE.md`.
