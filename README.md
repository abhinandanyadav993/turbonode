# Niranjan Monorepo (pnpm + Turborepo)

This repository contains:
- **apps/backend**: Node.js + Express + MongoDB (Mongoose) + TypeScript
- **apps/frontend**: Next.js (App Router) + TypeScript
- **packages/shared**: Shared TypeScript types used by both apps

## Quick Start

```sh
# 1) Install deps (at root)
pnpm install

# 2) Start all apps
pnpm dev
```

- Backend runs on `http://localhost:5001`
- Frontend runs on `http://localhost:3000`
- Frontend expects `NEXT_PUBLIC_API_URL` in `.env.local` (defaults to `http://localhost:5001`).

## Packages

### packages/shared
Shared interfaces so both backend & frontend use the same types without separate builds.

We use TS path mapping so imports like `@mhs/shared` resolve to `packages/shared/src` directly in dev.

## Commands

- `pnpm dev` – runs frontend and backend together via Turborepo
- `pnpm build` – builds all packages/apps in topological order
