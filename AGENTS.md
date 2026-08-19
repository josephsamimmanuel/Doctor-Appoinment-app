# AGENTS.md

Instructions for AI coding agents working on this repository.

## Project

Doctor Appointment Booking System — a pnpm + Turborepo monorepo for a patient SPA, admin dashboard, and backend API (MERN + TypeScript per SRS).

| Package | Role |
|:---|:---|
| `apps/server` | Express 5.2 API — health endpoint, middleware stack, MongoDB/Redis connections, standardized `ApiResponse`/`ApiError` (M0-2, M0-6) |
| `apps/patient` | Patient SPA — Vite 8 + React 19, Redux Toolkit + RTK Query, React Router 8, port 5173 (M0-3) |
| `apps/admin` | Admin dashboard — same stack as patient, sidebar layout, port 5174 (M0-4) |
| `packages/shared` (`@repo/shared`) | Shared domain types, constants, and Zod validators consumed by all three apps (M0-5) |
| `packages/typescript-config` (`@repo/typescript-config`) | Shared TypeScript base + React app configs |

**Runtime:** Node.js 24 — pinned in [`.nvmrc`](.nvmrc), `engines.node >= 24` in root [`package.json`](package.json).

**Package manager:** pnpm 11.22.0 — enforced via `packageManager` in root [`package.json`](package.json). Use Corepack:

```bash
corepack enable
corepack prepare pnpm@11.22.0 --activate
```

**Source of truth:** [`docs/SRS_Doctor_Appointment_App.md`](docs/SRS_Doctor_Appointment_App.md) (requirements) and [`docs/MILESTONES.md`](docs/MILESTONES.md) (implementation order and acceptance criteria). Prefer these over inventing scope. Current milestone: **M0** (M0-1–M0-6 complete after DB/Redis wiring).

## Commands

Root scripts (from [`package.json`](package.json)):

```bash
pnpm install          # install all workspace dependencies
pnpm build            # turbo run build — all packages; dependsOn ^build
pnpm dev              # turbo run dev — concurrent dev tasks
pnpm typecheck        # turbo run typecheck
pnpm lint             # turbo run lint (stub scripts in M0-1)
pnpm test             # turbo run test (stub scripts in M0-1)
```

Single-workspace (from [`README.md`](README.md)):

```bash
pnpm --filter server dev       # Express API on port 5000 (tsx watch)
pnpm --filter server start     # node dist/server.js (after build)
pnpm --filter patient dev      # Vite dev server on port 5173
pnpm --filter admin dev        # Vite dev server on port 5174
pnpm --filter patient preview  # vite preview (after build)
pnpm --filter admin preview    # vite preview (after build)
pnpm --filter @repo/shared build
```

`@repo/shared` must be built before apps import it, because they consume its emitted `dist/*.d.ts`. [`turbo.json`](turbo.json) encodes this: `build` and `typecheck` declare `dependsOn: ["^build"]`, and `test` declares `dependsOn: ["build"]` so a package's own output exists before its tests run.

## Structure

```
apps/
  server/src/
    config/         env.ts, db.ts (Mongoose), redis.ts (ioredis)
    controllers/    healthCheck.controller.ts
    routes/         index.ts — mounted at /api/v1
    middlewares/    cors, errorHandler, rateLimit
    utils/          apiResponse.ts, apiError.ts
  patient/src/
    app/            store.ts, baseApi.ts, hooks.ts (RTK Query + typed hooks)
    components/     layout/, ui/, features/ (placeholders)
    pages/          Home/, NotFound/
    styles/         index.css (design tokens from mock-ui)
  admin/src/        same layout as patient; AdminLayout with sidebar + top bar
packages/
  shared/src/
    types/          user, doctor, appointment, payment, hospital, review, common
    constants/      roles, specialties, appointmentStatus, httpStatus
    validators/     auth.schema.ts, appointment.schema.ts (Zod 4)
    __tests__/      node:test suites, run from dist/
  typescript-config/ base.json, react-app.json
docs/               SRS + milestone roadmap
mock-ui/            Static HTML mockups — reference only, not in build
```

**Import shared code:** prefer the subpath exports over the root barrel — `@repo/shared/types`, `@repo/shared/constants`, `@repo/shared/validators` (the root `@repo/shared` re-exports all three). Note that `@repo/shared/validators` pulls in Zod, so import it only where validation actually runs.

Canonical homes, to avoid duplicate definitions: `UserRole` and `AppointmentStatus` live in `constants/` (each is both a value and a type) and are only referenced from `types/`. Domain interfaces describe JSON on the wire — IDs and dates are `string`, and shared code must never import `mongoose`, since both browser apps consume this package.

**Extend TypeScript:** server and `@repo/shared` extend `@repo/typescript-config/base.json`; patient and admin extend `@repo/typescript-config/react-app.json`.

## Code style

Observed today (M0-4):

- **Language:** TypeScript 7 (`typescript` ^7.0.2), ESM (`"type": "module"` in app manifests).
- **Strictness:** `strict: true`, `noUncheckedIndexedAccess: true` — see [`packages/typescript-config/base.json`](packages/typescript-config/base.json). React apps add `verbatimModuleSyntax: true` via [`react-app.json`](packages/typescript-config/react-app.json).
- **Imports:** relative imports use `.js` extensions (NodeNext / bundler resolution). No `any` in current app source.
- **Backend:** `src/` → `dist/` via `tsc`; API prefix `/api/v1`; responses use `ApiResponse`/`ApiError` classes.
- **Frontend:** Vite build (`tsc --noEmit && vite build`); Redux store with RTK Query `baseApi` (`VITE_API_BASE_URL`, default `http://localhost:5000/api/v1`); typed hooks via `useDispatch.withTypes` / `useSelector.withTypes`.
- **Shared package:** no TypeScript `enum` — use an `as const` object plus a same-named union type, so each name works as both a value and a type. Validation uses Zod 4 (`z.email()`, `z.enum(READONLY_ARRAY)`), with enum arrays derived from the shared constants rather than re-typed.
- **Styling:** plain CSS with custom-property design tokens ported from `mock-ui/css/variables.css` (Inter via Google Fonts). No CSS-in-JS or component library yet.
- **Layout:** feature folders under `src/features/` and `src/components/features/` are placeholders (`.gitkeep` only).
- **Lint/format:** not configured yet (planned in M2-1: ESLint 9 flat config, Prettier, Husky + lint-staged per [`docs/MILESTONES.md`](docs/MILESTONES.md)).
- **Scope:** match existing patterns; do not add dependencies or features ahead of the milestone that introduces them.

## Testing

| Area | Runner (today) | Notes |
|:---|:---|:---|
| `@repo/shared` | `node:test` + `node:assert/strict` | Sources in `src/__tests__/`; `pnpm test` runs the compiled copies in `dist/__tests__/` |
| `server`, `patient`, `admin` | Stub (`node --eval`) | No real test runner configured |

Planned in **M1** (not yet present): Vitest + Supertest + MongoDB Memory Server (`server`), Vitest + React Testing Library + MSW (`patient`, `admin`), Playwright E2E. Coverage thresholds defined in milestones (e.g. 70% statements server, 65% frontend).

Until M1 lands: `pnpm test` only verifies stub scripts run. Add real tests when implementing behavior, following the M1 issue specs.

## Security & secrets

- Never commit [`.env`](.env) or any `.env.*` except [`.env.example`](.env.example) / `*.example` variants ([`.gitignore`](.gitignore)).
- Do not log or commit: `MONGODB_URI`, `REDIS_URL`, API keys, JWT secrets, payment keys, certificates (`*.pem`, `*.key`, etc.).
- Copy `.env.example` → `.env` at repo root for server vars (`PORT`, `CORS_ORIGINS`, `MONGODB_URI`, `REDIS_URL`, etc.). Frontend apps use `apps/patient/.env.example` and `apps/admin/.env.example` for `VITE_*` vars.
- Medical uploads and file storage will use direct object-storage access (Cloudinary per SRS) — do not proxy file bytes through the API when the spec says otherwise.

## Git & PRs

**Branch strategy** (from [`docs/MILESTONES.md`](docs/MILESTONES.md)):

```
feature/M<#>-<short-description>  →  develop  →  main
```

Example branches: `feature/M0-1-turborepo-workspaces`, `feature/M5-auth-register`.

**Commits:** descriptive sentence; reference milestone/issue when applicable (e.g. `Initialize Turborepo monorepo with pnpm workspaces (M0-1).`).

**PRs:** feature branches merge into `develop`; `develop` merges to `main` for production (CI/CD planned M2–M4).

No Husky hooks or CI workflows exist yet. Do not force-push `main`/`develop`.

**Note:** `.cursor/` is gitignored — project-level Cursor rules/skills here are local only and not shared with teammates.

## Boundaries

**Always**

- Follow [`docs/MILESTONES.md`](docs/MILESTONES.md) issue order and acceptance criteria.
- Use pnpm workspaces and Turborepo tasks; run `pnpm typecheck` after TypeScript changes.
- Build `@repo/shared` before importing it in apps (or rely on `pnpm build` at root).
- Treat `mock-ui/` as UI reference only — do not wire it into the monorepo build.
- Use existing API response/error utilities on the server; extend RTK Query via `baseApi` inject endpoints on the frontend.

**Ask first**

- Adding dependencies not specified in the current milestone issue.
- Schema/database migrations, CI/Docker/deploy config, or workspace layout changes.
- Broad refactors, swapping build tooling, or implementing features from a later milestone.
- Committing generated artifacts (`dist/`, `coverage/`, `.turbo/`) — all gitignored.

**Never**

- Commit secrets, `.env` files, or credentials.
- Rewrite git history on shared branches without explicit user request.
- Contradict the SRS or milestones without flagging the conflict to the user.
