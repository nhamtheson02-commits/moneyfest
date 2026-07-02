# MONEYFEST Repo Sync Guide

## Repositories

- Dev repo: `https://github.com/JasonBui1285/moneyfest`
- Production repo: `https://github.com/nhamtheson02-commits/moneyfest`

Use the Jason repo for Codex/dev work. Vercel should deploy from the production repo.

## Add Production Remote

Run once in the local repo:

```bash
git remote add production https://github.com/nhamtheson02-commits/moneyfest.git
```

If it already exists:

```bash
git remote set-url production https://github.com/nhamtheson02-commits/moneyfest.git
```

## Sync Flow

Do not sync to production until dev build passes.

```bash
npm install
npx prisma generate
npm run build
git status
```

Then run:

```bash
./scripts/sync-production.sh
```

The script does not create production env variables. Configure Vercel separately.

## Windows Team Commands

On Windows PowerShell:

```powershell
git checkout main
git pull origin main
npm install
npx prisma generate
npm run build
git push production main
```

If `production` remote does not exist:

```powershell
git remote add production https://github.com/nhamtheson02-commits/moneyfest.git
```
