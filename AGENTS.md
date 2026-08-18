# AGENTS.md

Instructions for AI coding agents working on this repository.

## Project

Doctor Appointment Booking System — a pnpm + Turborepo monorepo for a patient SPA, admin dashboard, and backend API (MERN + TypeScript per SRS).

| Package | Role |
|:---|:---|
| `apps/server` | Backend API (Express planned in M0-2; skeleton only) |
| `apps/patient` | Patient SPA (Vite + React planned in M0-3; skeleton only) |
| `apps/admin` | Admin dashboard (Vite + React planned in M0-4; skeleton only) |
| `packages/shared` (`@repo/shared`) | Shared types, constants, validators (M0-5) |
| `packages/typescript-config` (`@repo/typescript-config`) | Shared TypeScript base config |

**Runtime:** Node.js 24 — pinned in [`.nvmrc`](.nvmrc), `engines.node >= 24` in root [`package.json`](package.json).

**Package manager:** pnpm 11.22.0 — enforced via `packageManager` in root [`package.json`](package.json). Use Corepack:

```bash
corepack enable
corepack prepare pnpm@11.22.0 --activate
```

**Source of truth:** [`docs/SRS_Doctor_Appointment_App.md`](docs/SRS_Doctor_Appointment_App.md) (requirements) and [`docs/MILESTONES.md`](docs/MILESTONES.md) (implementation order and acceptance criteria). Prefer these over inventing scope. Current milestone: **M0** (scaffolding).

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
pnpm --filter server dev
pnpm --filter patient dev
pnpm --filter admin dev
pnpm --filter @repo/shared build
```

`@repo/shared` must be built before apps import it; Turborepo `build`/`typecheck`/`test` tasks already declare `dependsOn: ["^build"]` or `["^typecheck"]` in [`turbo.json`](turbo.json).

## Structure

```
apps/
  server/src/          # Backend entry (stub)
  patient/src/         # Patient app entry (stub)
  admin/src/           # Admin app entry (stub)
packages/
  shared/src/          # Shared exports (@repo/shared)
  typescript-config/   # base.json — strict TS defaults
docs/                  # SRS + milestone roadmap
mock-ui/               # Static HTML mockups — reference only, not in build
```

**Import shared code:** `@repo/shared` (workspace package). Example export today: `PACKAGE_NAME` from [`packages/shared/src/index.ts`](packages/shared/src/index.ts).

**Extend TypeScript:** each app/package `tsconfig.json` extends `@repo/typescript-config/base.json`.

## Code style

Observed today (M0-1 skeleton):

- **Language:** TypeScript 7 (`typescript` ^7.0.2), ESM (`"type": "module"` in app manifests).
- **Strictness:** `strict: true`, `noUncheckedIndexedAccess: true`, `module`/`moduleResolution`: `NodeNext`, target `ES2022` — see [`packages/typescript-config/base.json`](packages/typescript-config/base.json).
- **Layout:** `src/` → `dist/` via `tsc`; no path aliases configured yet.
- **Lint/format:** not configured yet (planned in M2-1: ESLint 9 flat config, Prettier, Husky + lint-staged per [`docs/MILESTONES.md`](docs/MILESTONES.md)).
- **Scope:** match existing minimal stubs; do not add frameworks or features ahead of the milestone that introduces them.

## Testing

| Area | Runner (today) | Notes |
|:---|:---|:---|
| All packages | Stub (`console.log('test stub')`) | No real test runner configured |

Planned in **M1** (not yet present): Vitest + Supertest + MongoDB Memory Server (`server`), Vitest + React Testing Library + MSW (`patient`, `admin`), Playwright E2E. Coverage thresholds defined in milestones (e.g. 70% statements server, 65% frontend).

Until M1 lands: `pnpm test` only verifies stub scripts run. Add real tests when implementing behavior, following the M1 issue specs.

## Security & secrets

- Never commit [`.env`](.env) or any `.env.*` except [`.env.example`](.env.example) / `*.example` variants ([`.gitignore`](.gitignore)).
- Do not log or commit: `MONGODB_URI`, `REDIS_URL`, API keys, JWT secrets, payment keys, certificates (`*.pem`, `*.key`, etc.).
- Copy `.env.example` → `.env` for local dev. Full env docs arrive in M0-6.
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

**Ask first**

- Adding dependencies not specified in the current milestone issue.
- Schema/database migrations, CI/Docker/deploy config, or workspace layout changes.
- Broad refactors, swapping build tooling, or implementing features from a later milestone.
- Committing generated artifacts (`dist/`, `coverage/`, `.turbo/`) — all gitignored.

**Never**

- Commit secrets, `.env` files, or credentials.
- Rewrite git history on shared branches without explicit user request.
- Contradict the SRS or milestones without flagging the conflict to the user.
