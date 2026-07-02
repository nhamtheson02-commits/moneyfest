#!/usr/bin/env bash
set -euo pipefail

# Sync MONEYFEST dev main to the production repository.
# Run this only after the owner approves production sync.

DEV_BRANCH="main"
PRODUCTION_REMOTE="production"
PRODUCTION_REPO="https://github.com/nhamtheson02-commits/moneyfest.git"

echo "Checking current branch..."
git checkout "$DEV_BRANCH"

echo "Pulling latest dev changes from origin..."
git pull origin "$DEV_BRANCH"

if ! git remote get-url "$PRODUCTION_REMOTE" >/dev/null 2>&1; then
  echo "Adding production remote..."
  git remote add "$PRODUCTION_REMOTE" "$PRODUCTION_REPO"
fi

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Running production build check..."
npm run build

echo "Pushing main to production remote..."
git push "$PRODUCTION_REMOTE" "$DEV_BRANCH"

echo "Production sync completed. Verify Vercel deployment from the production repo."
