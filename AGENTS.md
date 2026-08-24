# AGENTS.md

Instructions for AI coding agents working on this repository.

## Project

Doctor Appointment Booking System — pnpm + Turborepo monorepo (MERN + TypeScript). Spec: [`docs/SRS_Doctor_Appointment_App.md`](docs/SRS_Doctor_Appointment_App.md). Order: [`docs/MILESTONES.md`](docs/MILESTONES.md). **M0–M1 are in the repo**; next is **M2** (ESLint/Prettier, CI). Do not start later milestones unless that is the task.

| Package                   | Role                                                                        |
| :------------------------ | :-------------------------------------------------------------------------- |
| `apps/server`             | Express 5.2, `/api/v1`, MongoDB/Redis, `ApiResponse`/`ApiError`, port 5000  |
| `apps/patient`            | Vite 8 + React 19 + RTK Query, port **5173** (`strictPort`)                 |
| `apps/admin`              | Same stack, `AdminLayout` (sidebar + top bar), port **5174** (`strictPort`) |
| `@repo/shared`            | Types, constants, Zod validators — build `dist` before apps import it       |
| `@repo/typescript-config` | `base.json` (server/shared), `react-app.json` (patient/admin)               |
| `e2e`                     | Playwright smoke specs (starts both Vite apps)                              |

**Runtime:** Node 24 ([`.nvmrc`](.nvmrc), `engines.node >= 24`). **pnpm 11.22.0** (`packageManager`) via Corepack.

## Commands

```bash
pnpm install && pnpm build && pnpm typecheck
pnpm dev                          # all workspace dev tasks
pnpm lint                         # ESLint via Turborepo (all packages)
pnpm lint:fix                     # ESLint --fix across workspaces
pnpm format                       # Prettier write
pnpm format:check                 # Prettier check
pnpm test                         # unit + Playwright E2E
pnpm --filter server dev          # tsx watch, port 5000
pnpm --filter server start        # node dist/server.js
pnpm --filter server test         # also test:coverage
pnpm --filter patient dev         # Vite 5173 (fails if taken)
pnpm --filter admin dev           # Vite 5174 (fails if taken)
pnpm --filter patient test
pnpm --filter admin test
pnpm --filter @repo/shared build  # required before app typecheck
pnpm --filter @repo/shared test   # node:test on dist/__tests__/
pnpm --filter e2e test            # also test:ui
```

`turbo.json`: `build`/`typecheck` depend on `^build`; `test` depends on `build`. `e2e` overrides `test` to `dependsOn: []` (hits Vite, not `dist/`). Use `--filter` for unit tests only.

## Structure

```
apps/server/src/    config/, controllers/, routes/, middlewares/, utils/, test/, app.ts, server.ts
apps/patient/src/   app/, components/, pages/{Home,NotFound}/, styles/, test/
apps/admin/src/     same + AdminLayout, pages/Dashboard/
packages/shared/src types/, constants/, validators/, __tests__/
e2e/                playwright.config.ts, patient/, admin/, fixtures/, helpers/
docs/               SRS + milestones    mock-ui/  HTML reference only — not in the build
```

Import `@repo/shared/types`, `/constants`, `/validators` (validators pull in Zod). `UserRole` and `AppointmentStatus` live in `constants/`; `PaymentStatus`/`PaymentMethod` in `types/payment.types.ts`. Domain IDs/dates are `string`. Shared must never import `mongoose`. Server tests: `@test/factories`, `@test/helpers`.

## Code style

TypeScript 7 ESM, `strict` + `noUncheckedIndexedAccess`; React apps add `verbatimModuleSyntax`. Relative imports use `.js`. No `any` in app source. ESLint 9 flat config at root (`eslint.config.js`); Prettier 3 (`.prettierrc`). Root `typescript` resolves to `@typescript/typescript6` for ESLint; workspaces use TS 7 for `tsc`. Server: `tsc` → `dist`; `.env` at repo root then `apps/server/.env`; required `MONGODB_URI`, `REDIS_URL`. Frontend: RTK Query `baseApi` (`VITE_API_BASE_URL`, default `http://localhost:5000/api/v1`). Shared: `as const` + union, not `enum`; Zod 4. Plain CSS tokens from `mock-ui/css/variables.css`. Feature folders are `.gitkeep` only. Match existing patterns.

## Testing

| Area               | Runner                                        | Notes                                 |
| :----------------- | :-------------------------------------------- | :------------------------------------ |
| `@repo/shared`     | `node:test`                                   | compiled `dist/__tests__/`            |
| `server`           | Vitest 4.1.11 + Supertest + MongoMemoryServer | 70% statements / 65% branches         |
| `patient`, `admin` | Vitest + RTL + MSW + jsdom                    | 65% statements                        |
| `e2e`              | Playwright                                    | `corepack pnpm` locally, `pnpm` in CI |

Add tests with behavior changes; do not lower coverage thresholds. Server helpers insert raw collections and sign a **test-only** JWT (replace internals in M5; keep signatures). Frontend: `test-utils.tsx` (`Provider` + `MemoryRouter`); MSW must use `ApiResponse`/`ApiError`.

## Security & Git

Never commit `.env` / `.env.*` except `*.example`. Do not log `MONGODB_URI`, `REDIS_URL`, JWT/payment keys, or `*.pem`/`*.key`. Copy `.env.example` → `.env`; frontends use `apps/{patient,admin}/.env.example`. File storage is Cloudinary; SRS/M12-1 use Multer on `POST /api/v1/records/upload` — do not invent another path.

Branches: `feature/M<#>-<short-description>` → `develop` → `main`. Descriptive commits with milestone. Husky pre-commit runs lint-staged (ESLint + Prettier on staged `.ts`/`.tsx`). CI in M2-2/M2-3. Do not force-push `main`/`develop`. `.cursor/` is gitignored (local only).

## Boundaries

**Always** — Follow milestone issue order. Use pnpm/Turbo; `pnpm typecheck` after TS changes. Build `@repo/shared` before apps import it. `mock-ui/` is reference only. Server: existing `ApiResponse`/`ApiError`. Frontend: inject RTK Query endpoints on `baseApi`.

**Ask first** — New deps, schema/CI/Docker/deploy, workspace layout, broad refactors, later-milestone features, committing `dist/`/`coverage/`/`.turbo/`.

**Never** — Commit secrets. Rewrite git history on shared branches. Contradict the SRS or milestones without flagging it.
