# Doctor Appointment Booking System

A monorepo for the Doctor Appointment Booking System — patient app, admin dashboard, and backend API.

## Prerequisites

- **Node.js** 24 (see [`.nvmrc`](.nvmrc))
- **pnpm** 11.22.0 (enforced via `packageManager` in root `package.json`)

```bash
corepack enable
corepack prepare pnpm@11.22.0 --activate
```

## Workspace structure

```
apps/
  server/    # Backend API (Express 5 + TypeScript)
  patient/   # Patient-facing SPA (Vite + React — M0-3)
  admin/     # Admin dashboard (Vite + React — M0-4)
packages/
  shared/              # Shared types, constants, validators (M0-5)
  typescript-config/   # Shared TypeScript configuration
docs/                  # SRS and milestone roadmap
mock-ui/               # Static HTML mockups (reference only, not part of the build)
```

## Getting started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all dev tasks concurrently
pnpm dev

# Type-check all packages
pnpm typecheck

# Lint and test (stub scripts in M0-1)
pnpm lint
pnpm test
```

## Run a single workspace

```bash
pnpm --filter server dev
pnpm --filter patient dev
pnpm --filter admin dev
pnpm --filter @repo/shared build
```

## Backend API (server)

Start the Express API on port 5000 (default):

```bash
pnpm --filter server dev
```

Health check:

```bash
curl http://localhost:5000/api/v1/health
```

Expected response shape:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Server is healthy",
  "data": {
    "status": "ok",
    "timestamp": "2026-08-18T00:00:00.000Z",
    "uptime": 1.23
  }
}
```

## Environment variables

Copy [`.env.example`](.env.example) to `.env` and adjust values for local development. Full environment documentation will be added in M0-6.

## Milestones

Development follows the roadmap in [`docs/MILESTONES.md`](docs/MILESTONES.md). M0-1 sets up the Turborepo monorepo skeleton; M0-2 adds the Express backend server skeleton.
