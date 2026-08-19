# Doctor Appointment Booking System

A monorepo for the Doctor Appointment Booking System — patient app, admin dashboard, and backend API.

## Prerequisites

- **Node.js** 24 (see [`.nvmrc`](.nvmrc))
- **pnpm** 11.22.0 (enforced via `packageManager` in root `package.json`)
- **MongoDB** — local instance or Atlas URI (required by the server)
- **Redis** — local instance or hosted URL (required by the server)

```bash
corepack enable
corepack prepare pnpm@11.22.0 --activate
```

## Workspace structure

```
apps/
  server/    # Backend API (Express 5 + TypeScript)
  patient/   # Patient-facing SPA (Vite 8 + React 19)
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

# Lint (stub scripts until M2-1) and test (real suites in @repo/shared only)
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

## Patient app

Start the patient SPA on port 5173 (default):

```bash
pnpm --filter patient dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Unknown routes render a 404 page.

Copy `apps/patient/.env.example` to `apps/patient/.env` (or set at the monorepo root if you prefer) and adjust:

```bash
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Backend API (server)

Ensure MongoDB and Redis are running, then copy [`.env.example`](.env.example) to `.env` at the repo root and set `MONGODB_URI` and `REDIS_URL`.

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
    "uptime": 1.23,
    "db": "connected",
    "redis": "connected"
  }
}
```

## Shared package

`@repo/shared` holds the domain contracts used by the API and both frontends. Import from a subpath rather than the root barrel so you only pull in what you need:

```ts
import { HTTP_STATUS, UserRole } from '@repo/shared/constants';
import type { IAppointment, IUser } from '@repo/shared/types';
import { registerSchema } from '@repo/shared/validators';
```

`@repo/shared/validators` depends on Zod, so import it only where validation actually runs. The package must be built before the apps can resolve its types — `pnpm build` and `pnpm typecheck` handle that ordering, or build it directly:

```bash
pnpm --filter @repo/shared build
pnpm --filter @repo/shared test
```

Domain interfaces describe JSON on the wire: identifiers and dates are `string`, so the package stays free of Mongoose types and remains safe to bundle into the browser apps.

## Environment variables

Copy [`.env.example`](.env.example) to `.env` at the repo root and adjust values for local development.

| Variable | Required | Description |
|:---|:---|:---|
| `NODE_ENV` | No | `development` (default), `production`, or `test` |
| `PORT` | No | HTTP port for the API (default `5000`) |
| `CORS_ORIGINS` | No | Comma-separated allowed origins (defaults to patient and admin dev URLs) |
| `MONGODB_URI` | Yes | MongoDB connection string for Mongoose |
| `REDIS_URL` | Yes | Redis connection URL for ioredis |

Frontend apps use `apps/patient/.env.example` and `apps/admin/.env.example` for `VITE_*` variables.

## Milestones

Development follows the roadmap in [`docs/MILESTONES.md`](docs/MILESTONES.md). M0-1 sets up the Turborepo monorepo skeleton; M0-2 adds the Express backend server skeleton; M0-3 adds the patient Vite + React SPA skeleton; M0-4 adds the admin dashboard skeleton; M0-5 adds the shared types, constants, and Zod validators; M0-6 adds MongoDB and Redis connection configuration.
