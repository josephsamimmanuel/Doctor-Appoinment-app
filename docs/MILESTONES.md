# 🗺️ Product Development Milestones

## Doctor Appointment Booking System

### GitHub Issues — Step-by-Step Development Roadmap

---

| **Field**            | **Details**                                            |
| :------------------- | :----------------------------------------------------- |
| **Project**          | Doctor Appointment Booking System                      |
| **Version**          | 1.0                                                    |
| **Date**             | August 18, 2026                                        |
| **Methodology**      | Infrastructure-First → Feature-by-Feature Release      |
| **Issue Size**       | 1–3 days per issue                                     |
| **Branch Strategy**  | Feature branches → `develop` (staging) → `main` (prod) |
| **Total Milestones** | 16                                                     |
| **Total Issues**     | ~78                                                    |

---

## Branch & Release Strategy

```
feature/M5-auth-register ──┐
feature/M5-auth-login ─────┤
feature/M5-auth-jwt ───────┼──▶ develop ──▶ staging.yourdomain.com
feature/M5-auth-oauth ─────┤       │
feature/M5-auth-rbac ──────┘       │ (milestone complete)
                                   ▼
                                 main ──▶ yourdomain.com (production)
```

**Every push to `develop`** → auto-deploys to staging
**Every merge to `main`** → auto-deploys to production

---

## Table of Contents

- [M0 — Project Scaffolding](#m0--project-scaffolding)
- [M1 — Test Suite Foundation](#m1--test-suite-foundation)
- [M2 — CI Pipeline](#m2--ci-pipeline)
- [M3 — Docker & CD Pipeline](#m3--docker--cd-pipeline)
- [M4 — CloudClusters & Domain](#m4--cloudclusters--domain)
- [M5 — Authentication & User System](#m5--authentication--user-system)
- [M6 — Doctor & Search](#m6--doctor--search)
- [M7 — Appointment Booking](#m7--appointment-booking)
- [M8 — Payments (Razorpay)](#m8--payments-razorpay)
- [M9 — Admin Dashboard](#m9--admin-dashboard)
- [M10 — Notifications](#m10--notifications)
- [M11 — Telemedicine](#m11--telemedicine)
- [M12 — Records & Prescriptions](#m12--records--prescriptions)
- [M13 — Admin Advanced](#m13--admin-advanced)
- [M14 — Reviews & Polish](#m14--reviews--polish)
- [M15 — Production Release](#m15--production-release)

---

---

## M0 — Project Scaffolding

> **Goal**: Set up the Turborepo monorepo with all three apps (server, patient, admin), shared package, database connections, and environment configuration. No features — just the skeleton.

---

### Issue M0-1: Initialize Turborepo Monorepo with pnpm Workspaces

**Labels**: `milestone:M0` `type:setup` `priority:critical`
**Estimate**: 1 day

#### Context

This is the very first commit. We need a Turborepo monorepo with pnpm workspaces containing three apps (`server`, `patient`, `admin`) and one shared package (`shared`). All TypeScript with a base config shared across packages.

#### Requirements

- Initialize Turborepo project with pnpm workspaces
- Create `pnpm-workspace.yaml` defining `apps/*` and `packages/*`
- Create root `package.json` with workspace scripts
- Create `turbo.json` with pipeline for `build`, `dev`, `lint`, `test`, `typecheck`
- Create `tsconfig.base.json` at root with strict TypeScript settings
- Create `.gitignore`, `.nvmrc` (Node 24), `.env.example`
- Create root `README.md` with project overview

#### Acceptance Criteria

- [ ] `pnpm install` runs successfully at root
- [ ] `pnpm turbo build` executes across all packages (even if empty)
- [ ] `pnpm turbo dev` starts all dev servers concurrently
- [ ] TypeScript strict mode enabled in base config
- [ ] `.nvmrc` specifies Node.js 24
- [ ] All workspace packages resolve correctly

#### Test Criteria

- Verify `pnpm install` produces no errors
- Verify `turbo.json` pipeline is valid via `turbo run build --dry`
- Verify TypeScript compilation with `tsc --noEmit` at root

#### Dependencies

- None (first issue)

---

### Issue M0-2: Setup Backend Server Skeleton (Express + TypeScript)

**Labels**: `milestone:M0` `type:setup` `priority:critical`
**Estimate**: 2 days

#### Context

Create the Express.js 5.2 backend server inside `apps/server` with TypeScript. This includes the folder structure (config, models, controllers, routes, middlewares, services, utils), basic Express app setup, health check endpoint, and environment variable loading.

#### Requirements

- Create `apps/server/package.json` with Express 5.2, TypeScript, and dev dependencies
- Create `apps/server/tsconfig.json` extending root base config
- Create folder structure:
  ```
  src/
  ├── config/       (empty stubs)
  ├── models/       (empty)
  ├── controllers/  (healthCheck.controller.ts)
  ├── routes/       (index.ts with health route)
  ├── middlewares/   (errorHandler.middleware.ts, cors setup)
  ├── services/     (empty)
  ├── utils/        (apiResponse.ts, apiError.ts)
  ├── app.ts        (Express app setup with middleware)
  └── server.ts     (entry point, listen on PORT)
  ```
- Install & configure: `helmet`, `cors`, `morgan`, `dotenv`, `express-rate-limit`
- Create standardized API response format (`ApiResponse`, `ApiError` classes)
- Add `GET /api/v1/health` endpoint returning `{ status: 'ok', timestamp, uptime }`
- Add `dev` and `build` scripts using `tsx` for development

#### Acceptance Criteria

- [ ] `pnpm --filter server dev` starts the server on port 5000
- [ ] `GET http://localhost:5000/api/v1/health` returns 200 with status: ok
- [ ] Helmet security headers present in response
- [ ] CORS configured for localhost origins
- [ ] Morgan request logging visible in console
- [ ] Unknown routes return structured 404 JSON response
- [ ] Unhandled errors caught by global error handler middleware

#### Test Criteria

- Health endpoint returns correct JSON structure
- Error handler returns proper error format for 404 and 500 errors
- ApiResponse and ApiError utility classes produce correct output

#### Dependencies

- M0-1

---

### Issue M0-3: Setup Patient App Skeleton (Vite + React + TypeScript)

**Labels**: `milestone:M0` `type:setup` `priority:critical`
**Estimate**: 1 day

#### Context

Create the Patient-facing React SPA inside `apps/patient` using Vite 8 with TypeScript. Set up the basic folder structure, Redux store, React Router, and a landing page placeholder.

#### Requirements

- Initialize Vite 8 React TypeScript project in `apps/patient`
- Create folder structure:
  ```
  src/
  ├── app/          (store.ts, hooks.ts)
  ├── features/     (empty feature directories)
  ├── components/   (ui/, layout/, features/)
  ├── pages/        (Home/, NotFound/)
  ├── hooks/        (empty)
  ├── utils/        (empty)
  ├── styles/       (index.css with design tokens / CSS variables)
  ├── assets/       (empty)
  ├── App.tsx       (Router setup with layout)
  └── main.tsx      (entry point with Redux Provider)
  ```
- Install & configure Redux Toolkit + RTK Query
- Create Redux store with typed hooks (`useAppDispatch`, `useAppSelector`)
- Setup React Router v8 with basic routes (Home, NotFound/404)
- Create a minimal layout component (Header placeholder, main content area)
- Create CSS design tokens (colors, spacing, typography, border-radius)
- Import Google Font (Inter)

#### Acceptance Criteria

- [ ] `pnpm --filter patient dev` starts Vite dev server on port 5173
- [ ] Home page renders with project title placeholder
- [ ] 404 page renders for unknown routes
- [ ] Redux DevTools shows initialized store
- [ ] CSS design tokens (custom properties) defined and applied
- [ ] Inter font loaded from Google Fonts
- [ ] No TypeScript or ESLint errors

#### Test Criteria

- App renders without crashing
- Router navigates between Home and 404 pages
- Redux store initializes correctly

#### Dependencies

- M0-1

---

### Issue M0-4: Setup Admin App Skeleton (Vite + React + TypeScript)

**Labels**: `milestone:M0` `type:setup` `priority:critical`
**Estimate**: 1 day

#### Context

Create the Admin dashboard React SPA inside `apps/admin`. Similar to the patient app but with a sidebar-based admin layout.

#### Requirements

- Initialize Vite 8 React TypeScript project in `apps/admin`
- Create folder structure (mirror of patient app structure with admin-specific additions):
  ```
  src/
  ├── app/          (store.ts, hooks.ts)
  ├── features/     (empty directories for dashboard, doctors, etc.)
  ├── components/   (ui/, layout/, charts/, features/)
  ├── pages/        (Dashboard/, NotFound/)
  ├── hooks/
  ├── utils/
  ├── styles/       (index.css with admin design tokens)
  ├── App.tsx
  └── main.tsx
  ```
- Install & configure Redux Toolkit + RTK Query
- Create admin layout with sidebar navigation and top bar (placeholder content)
- Setup React Router v8 with routes (Dashboard, NotFound)
- Create admin-specific CSS design tokens (darker palette suitable for dashboards)

#### Acceptance Criteria

- [ ] `pnpm --filter admin dev` starts on port 5174
- [ ] Admin layout renders with sidebar and top bar
- [ ] Dashboard page renders placeholder content
- [ ] 404 page renders for unknown routes
- [ ] Redux DevTools shows initialized store
- [ ] Admin design tokens defined (dark-friendly palette)
- [ ] No TypeScript or ESLint errors

#### Test Criteria

- Admin app renders without crashing
- Sidebar navigation renders with placeholder links
- Router navigates between Dashboard and 404

#### Dependencies

- M0-1

---

### Issue M0-5: Create Shared Package (Types, Constants, Validators)

**Labels**: `milestone:M0` `type:setup` `priority:critical`
**Estimate**: 1 day

#### Context

Create the `packages/shared` TypeScript library containing shared types, constants, and Zod validation schemas used by both frontend apps and the backend server.

#### Requirements

- Create `packages/shared/package.json` with `exports` field
- Create `packages/shared/tsconfig.json`
- Create shared types:
  ```
  src/types/
  ├── user.types.ts        (IUser, IUserProfile, UserRole enum)
  ├── doctor.types.ts      (IDoctor, Specialization enum)
  ├── appointment.types.ts (IAppointment, AppointmentStatus, AppointmentMode enums)
  ├── payment.types.ts     (IPayment, PaymentStatus, PaymentMethod enums)
  ├── hospital.types.ts    (IHospital, IDepartment)
  ├── review.types.ts      (IReview)
  ├── common.types.ts      (ApiResponse, PaginatedResponse, ApiError)
  └── index.ts
  ```
- Create shared constants:
  ```
  src/constants/
  ├── roles.ts             (USER_ROLES: patient, doctor, admin, superAdmin, receptionist, labTech)
  ├── specialties.ts       (SPECIALTIES array)
  ├── appointmentStatus.ts (STATUS enum: pending, confirmed, inProgress, completed, cancelled, noShow)
  ├── httpStatus.ts        (HTTP_STATUS codes)
  └── index.ts
  ```
- Create shared validators:
  ```
  src/validators/
  ├── auth.schema.ts       (registerSchema, loginSchema)
  ├── appointment.schema.ts (bookAppointmentSchema)
  └── index.ts
  ```
- Install `zod` as dependency
- Ensure package is importable from both apps and server via `@shared/*`

#### Acceptance Criteria

- [ ] `import { UserRole } from '@shared/constants'` works in all three apps
- [ ] `import { IUser } from '@shared/types'` works in all three apps
- [ ] Zod schemas validate correctly (register schema rejects bad email, short password)
- [ ] `pnpm turbo build` includes shared package build
- [ ] No circular dependencies

#### Test Criteria

- Zod schemas: test registerSchema with valid and invalid data
- Zod schemas: test loginSchema with valid and invalid data
- All enums export expected values
- Type exports compile without errors

#### Dependencies

- M0-1

---

### Issue M0-6: Database & Redis Connection Configuration

**Labels**: `milestone:M0` `type:setup` `priority:critical`
**Estimate**: 1 day

#### Context

Configure MongoDB (via Mongoose 9.9) and Redis (via ioredis) connections in the backend server. Add graceful shutdown handling, connection retry logic, and environment-based configuration.

#### Requirements

- Install `mongoose@9.9.2` and `ioredis@5.x`
- Create `src/config/db.ts`:
  - Connect to MongoDB using `MONGODB_URI` env variable
  - Mongoose connection event listeners (connected, error, disconnected)
  - Retry logic on initial connection failure (3 retries with backoff)
- Create `src/config/redis.ts`:
  - Connect to Redis using `REDIS_URL` env variable
  - Connection event listeners
  - Export Redis client instance
- Update `server.ts` to:
  - Connect to MongoDB before starting Express server
  - Connect to Redis
  - Graceful shutdown on SIGINT/SIGTERM (close DB, Redis, then exit)
- Update `.env.example` with `MONGODB_URI` and `REDIS_URL` placeholders
- Add connection status to `/api/v1/health` endpoint (db: connected/disconnected, redis: connected/disconnected)

#### Acceptance Criteria

- [ ] Server connects to local MongoDB on startup (logged in console)
- [ ] Server connects to local Redis on startup (logged in console)
- [ ] Health endpoint shows DB and Redis connection status
- [ ] Server logs clear error message if MongoDB is unreachable
- [ ] Server retries connection on initial failure
- [ ] Graceful shutdown closes connections before process exit
- [ ] `.env.example` contains all required env variables

#### Test Criteria

- Health endpoint reflects actual DB connection status
- Connection retry logic triggers on failure (mock test)
- Graceful shutdown sequence executes in correct order

#### Dependencies

- M0-2

---

---

## M1 — Test Suite Foundation

> **Goal**: Set up Vitest, React Testing Library, Supertest, Playwright, and MSW configurations. Write first smoke tests to validate the setup works.

---

### Issue M1-1: Configure Vitest for Backend (Server App)

**Labels**: `milestone:M1` `type:testing` `priority:critical`
**Estimate**: 1 day

#### Context

Set up Vitest as the test runner for the backend server. Configure it for Node.js environment with MongoDB Memory Server for isolated database tests. Create test setup file and first smoke test.

#### Requirements

- Install `vitest`, `@vitest/coverage-v8`, `mongodb-memory-server`, `supertest`, `@faker-js/faker`
- Create `apps/server/vitest.config.ts`:
  - Environment: `node`
  - Globals: true
  - Setup file: `src/test/setup.ts`
  - Coverage provider: `v8` with thresholds (70% statements, 65% branches)
  - Include: `src/**/*.test.ts`
- Create `src/test/setup.ts`:
  - Start MongoDB Memory Server in `beforeAll`
  - Connect Mongoose to in-memory DB
  - Disconnect and stop in `afterAll`
  - Clear all collections in `beforeEach`
- Create `src/test/helpers.ts`:
  - Helper to create test user data (using faker)
  - Helper to create supertest request instance
- Add scripts to `package.json`: `test`, `test:watch`, `test:coverage`
- Write first smoke test: `src/controllers/__tests__/health.controller.test.ts`
  - Test `GET /api/v1/health` returns 200 with correct structure

#### Acceptance Criteria

- [ ] `pnpm --filter server test` runs and passes
- [ ] `pnpm --filter server test:coverage` generates coverage report
- [ ] MongoDB Memory Server starts automatically during tests
- [ ] Health endpoint smoke test passes
- [ ] Coverage report shows HTML output in `coverage/` directory
- [ ] Tests run in isolation (no external DB required)

#### Test Criteria

- Health endpoint test validates response structure
- Test setup correctly initializes and tears down in-memory DB
- Coverage report generates without errors

#### Dependencies

- M0-2, M0-6

---

### Issue M1-2: Configure Vitest + React Testing Library for Frontend Apps

**Labels**: `milestone:M1` `type:testing` `priority:critical`
**Estimate**: 1 day

#### Context

Set up Vitest with React Testing Library and MSW for both frontend apps (patient and admin). Configure jsdom environment, setup files, and write first component smoke tests.

#### Requirements

- Install in both `apps/patient` and `apps/admin`:
  - `vitest`, `@vitest/coverage-v8`
  - `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
  - `msw`, `jsdom`
- Create `vitest.config.ts` for each app:
  - Environment: `jsdom`
  - Globals: true
  - CSS: true
  - Setup file: `src/test/setup.ts`
  - Coverage: v8 with thresholds (65% statements)
- Create `src/test/setup.ts` for each app:
  - Import `@testing-library/jest-dom` matchers
  - MSW server setup (start/reset/close lifecycle)
- Create `src/test/test-utils.tsx`:
  - Custom `render` function wrapping components with Redux Provider and Router
  - Export all `@testing-library/react` utilities
- Add scripts: `test`, `test:watch`, `test:coverage`
- Write smoke test: `src/App.test.tsx`
  - Test that App component renders without crashing
  - Test that Home page renders expected heading

#### Acceptance Criteria

- [ ] `pnpm --filter patient test` runs and passes
- [ ] `pnpm --filter admin test` runs and passes
- [ ] Custom render utility wraps with Provider and Router
- [ ] MSW server lifecycle hooks configured in setup
- [ ] App smoke tests pass for both apps
- [ ] jest-dom matchers available (e.g., `toBeInTheDocument`)

#### Test Criteria

- App renders without crashing (patient)
- App renders without crashing (admin)
- Custom render provides Redux store context
- MSW setup file starts/resets/closes server correctly

#### Dependencies

- M0-3, M0-4

---

### Issue M1-3: Configure Playwright for E2E Tests

**Labels**: `milestone:M1` `type:testing` `priority:critical`
**Estimate**: 1 day

#### Context

Set up Playwright at the monorepo root level for cross-browser E2E testing. Configure for 3 desktop browsers + 2 mobile viewports. Create the test directory structure and write first E2E smoke test.

#### Requirements

- Create `e2e/` directory at monorepo root with its own `package.json`
- Install `@playwright/test` and run `npx playwright install`
- Create `e2e/playwright.config.ts`:
  - 5 projects: Chromium, Firefox, WebKit, Mobile Chrome (Pixel 7), Mobile Safari (iPhone 15)
  - Timeout: 30 seconds
  - Retries: 2 on CI, 0 locally
  - Screenshots: only on failure
  - Video: retain on failure
  - Trace: on first retry
  - WebServer: start patient app on port 5173
- Create test directory structure:
  ```
  e2e/
  ├── patient/
  │   └── smoke.spec.ts
  ├── admin/
  │   └── smoke.spec.ts
  ├── fixtures/        (custom test fixtures - empty for now)
  ├── helpers/         (shared helpers - empty for now)
  └── playwright.config.ts
  ```
- Write smoke test for patient app: `e2e/patient/smoke.spec.ts`
  - Navigate to home page
  - Verify page title
  - Verify home page heading visible
- Write smoke test for admin app: `e2e/admin/smoke.spec.ts`
  - Navigate to admin home page
  - Verify sidebar is visible
- Add scripts: `test`, `test:ui`, `test:report`
- Add `e2e` to Turborepo pipeline

#### Acceptance Criteria

- [ ] `pnpm --filter e2e test` runs Playwright tests
- [ ] Smoke tests pass on at least Chromium
- [ ] Test report generated in `e2e/playwright-report/`
- [ ] Screenshots captured on failure
- [ ] WebServer auto-starts patient app before tests
- [ ] Playwright UI mode works with `test:ui`

#### Test Criteria

- Patient app home page loads and shows heading
- Admin app loads and shows sidebar navigation
- Tests run across Chromium (other browsers optional during dev)

#### Dependencies

- M0-3, M0-4

---

### Issue M1-4: Create Test Data Factories & Shared Test Helpers

**Labels**: `milestone:M1` `type:testing` `priority:high`
**Estimate**: 1 day

#### Context

Create reusable test data factories using faker.js and shared test helpers that will be used across all test suites. This eliminates duplicate test setup code and ensures consistent test data.

#### Requirements

- Create `apps/server/src/test/factories/`:
  - `user.factory.ts` — generate valid user data (patient, doctor, admin)
  - `doctor.factory.ts` — generate valid doctor profile data
  - `appointment.factory.ts` — generate valid appointment data
  - `hospital.factory.ts` — generate valid hospital data
  - `index.ts` — re-export all factories
- Create `apps/server/src/test/helpers.ts`:
  - `createTestUser(overrides?)` — insert user into test DB, return user + token
  - `createTestDoctor(overrides?)` — insert doctor into test DB
  - `createTestAppointment(overrides?)` — insert appointment into test DB
  - `getAuthHeader(token)` — return `{ Authorization: 'Bearer <token>' }`
- Create MSW handler templates for frontend apps:
  - `apps/patient/src/test/handlers/auth.handlers.ts` — mock auth API responses
  - `apps/patient/src/test/handlers/doctor.handlers.ts` — mock doctor API responses
  - `apps/patient/src/test/handlers/index.ts` — export combined handlers
- Repeat MSW handlers for admin app (admin-specific endpoints)

#### Acceptance Criteria

- [ ] Factories generate valid data matching Zod schemas from shared package
- [ ] `createTestUser()` returns user document + valid JWT token
- [ ] Factories accept optional overrides to customize data
- [ ] MSW handlers return realistic API response shapes matching backend format
- [ ] All factories use `@faker-js/faker` for realistic data
- [ ] Helpers importable from `@test/factories` and `@test/helpers` paths

#### Test Criteria

- User factory generates data that passes registerSchema validation
- Doctor factory generates data with valid specialization enum
- createTestUser inserts into DB and returns valid JWT
- MSW handlers respond with correct status codes and data shapes

#### Dependencies

- M0-5, M1-1, M1-2

---

---

## M2 — CI Pipeline

> **Goal**: Set up GitHub Actions CI workflow that runs lint, typecheck, and tests on every push/PR. No code merges without passing tests.

---

### Issue M2-1: ESLint + Prettier Configuration

**Labels**: `milestone:M2` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Configure ESLint 9 (flat config) and Prettier across the entire monorepo. Set up Husky + lint-staged to enforce linting on every commit.

#### Requirements

- Install `eslint@9.x`, `prettier@3.x`, `husky@9.x`, `lint-staged@15.x` at root
- Create `eslint.config.js` (ESLint flat config) at root:
  - TypeScript rules (strict)
  - React rules (for apps/patient and apps/admin)
  - Node.js rules (for apps/server)
  - Import order rules
- Create `.prettierrc` with project conventions (semi, singleQuote, tabWidth, printWidth)
- Create `.prettierignore`
- Configure Husky pre-commit hook:
  - Run `lint-staged` on staged files
  - lint-staged runs: ESLint --fix + Prettier --write on `.ts`, `.tsx` files
- Add root scripts: `lint`, `lint:fix`, `format`, `format:check`
- Add `lint` and `typecheck` tasks to `turbo.json` pipeline

#### Acceptance Criteria

- [ ] `pnpm turbo lint` runs ESLint across all packages with zero errors
- [ ] `pnpm turbo typecheck` runs `tsc --noEmit` across all packages
- [ ] `pnpm format:check` validates formatting across all files
- [ ] Husky pre-commit hook runs lint-staged automatically
- [ ] lint-staged auto-fixes and formats staged files
- [ ] Different ESLint rules for React (frontend) vs Node.js (backend)

#### Test Criteria

- Introduce a deliberate lint error → verify ESLint catches it
- Introduce bad formatting → verify Prettier catches it
- Commit with lint error → verify Husky blocks the commit

#### Dependencies

- M0-1 through M0-5

---

### Issue M2-2: GitHub Actions — Lint & TypeCheck Workflow

**Labels**: `milestone:M2` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Create the first GitHub Actions CI workflow that runs on every push and pull request. This initial workflow handles linting and type checking.

#### Requirements

- Create `.github/workflows/ci.yml`
- Job 1: `lint-typecheck`
  - Runs on `ubuntu-latest`
  - Steps: checkout → setup pnpm → setup Node 24 → install → lint → typecheck
  - Cache `node_modules` and pnpm store for speed
  - Turbo cache (remote or local) configured
- Configure branch protection rules (document in README):
  - `develop` and `main` branches require passing CI
  - PR reviews required before merge
- Add CI status badge to root `README.md`

#### Acceptance Criteria

- [ ] Workflow triggers on push to any branch and on pull requests
- [ ] `lint-typecheck` job passes on a clean codebase
- [ ] pnpm store is cached between runs (faster subsequent runs)
- [ ] Workflow fails if any lint error or type error exists
- [ ] CI badge shows in README
- [ ] Workflow uses pnpm/action-setup and actions/setup-node

#### Test Criteria

- Push clean code → CI passes (green)
- Push code with type error → CI fails (red)
- Push code with lint error → CI fails (red)
- Second run is faster due to cache

#### Dependencies

- M2-1

---

### Issue M2-3: GitHub Actions — Test & Coverage Workflow

**Labels**: `milestone:M2` `type:devops` `priority:critical`
**Estimate**: 2 days

#### Context

Extend the CI workflow to run all test suites (Vitest unit/integration + Playwright E2E) and enforce coverage thresholds. Tests only run after lint/typecheck passes.

#### Requirements

- Add to `.github/workflows/ci.yml`:
- Job 2: `unit-tests` (needs: `lint-typecheck`)
  - Services: MongoDB 8 (port 27017), Redis 7 (port 6379)
  - Steps: checkout → setup → install → run `pnpm turbo test:coverage`
  - Upload coverage reports as artifacts
  - Fail if coverage below thresholds
- Job 3: `e2e-tests` (needs: `unit-tests`)
  - Steps: checkout → setup → install → install Playwright browsers → run E2E tests
  - Upload Playwright HTML report as artifact on failure
  - Upload test videos/screenshots on failure
- Add Turborepo pipeline tasks: `test`, `test:coverage`
- Create concurrency group to cancel outdated workflow runs on same branch

#### Acceptance Criteria

- [ ] Unit tests run with MongoDB + Redis service containers
- [ ] Coverage report uploaded as downloadable artifact
- [ ] E2E tests run after unit tests pass
- [ ] Playwright report uploaded on failure for debugging
- [ ] Workflow fails if coverage below configured thresholds
- [ ] Concurrent runs on same branch cancel previous runs
- [ ] Full CI pipeline: lint → typecheck → unit tests → e2e tests

#### Test Criteria

- All existing smoke tests pass in CI
- Coverage artifacts downloadable from workflow run
- Failing test causes workflow to fail
- Playwright report accessible on failure

#### Dependencies

- M1-1, M1-2, M1-3, M2-2

---

---

## M3 — Docker & CD Pipeline

> **Goal**: Containerize the application with Docker, create docker-compose for local development, and set up continuous deployment to staging.

---

### Issue M3-1: Dockerfile for Production Build

**Labels**: `milestone:M3` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Create a multi-stage Dockerfile that builds the entire monorepo (backend + both frontend apps) into a production-ready container. The backend serves the static frontend builds.

#### Requirements

- Create `Dockerfile` at monorepo root:
  - **Stage 1 (Builder)**: Install dependencies, build shared package, build both frontend apps (Vite), build backend (TypeScript → JavaScript)
  - **Stage 2 (Production)**: Copy only production `node_modules`, built backend, and frontend dist folders. No source code or dev dependencies.
- Backend serves:
  - API routes at `/api/v1/*`
  - Patient app static files at `/` (fallback to `index.html` for SPA routing)
  - Admin app static files at `/admin/*` (fallback to `index.html` for SPA routing)
- Create `.dockerignore` excluding `node_modules`, `.git`, `coverage`, `playwright-report`
- Expose port 5000
- Set `NODE_ENV=production`
- Use `node` (not `tsx`) to run compiled JavaScript

#### Acceptance Criteria

- [ ] `docker build -t doc-app .` builds successfully
- [ ] `docker run -p 5000:5000 doc-app` starts the container
- [ ] `GET /api/v1/health` works from container
- [ ] Patient app accessible at `http://localhost:5000/`
- [ ] Admin app accessible at `http://localhost:5000/admin/`
- [ ] Container image size < 500MB (production optimized)
- [ ] No TypeScript source code in production image

#### Test Criteria

- Health endpoint responds from container
- Frontend apps load from container-served static files
- Container starts within 10 seconds
- No dev dependencies present in production image

#### Dependencies

- M0-2, M0-3, M0-4

---

### Issue M3-2: Docker Compose for Local Development

**Labels**: `milestone:M3` `type:devops` `priority:high`
**Estimate**: 1 day

#### Context

Create a `docker-compose.yml` for local development that spins up MongoDB, Redis, and optionally the backend server. Developers should be able to run `docker compose up` to get all infrastructure services running.

#### Requirements

- Create `docker-compose.yml` with services:
  - `mongodb`: MongoDB 8.3 with persistent volume, port 27017
  - `redis`: Redis 7 with persistent volume, port 6379
  - `mongo-express` (optional): Web UI for MongoDB at port 8081
- Create `docker-compose.prod.yml` (production override):
  - `app`: Build from Dockerfile, depends on mongodb and redis, port 5000
  - Environment variables from `.env` file
- Create `Makefile` or root scripts:
  - `pnpm docker:up` → start infrastructure (MongoDB + Redis)
  - `pnpm docker:down` → stop everything
  - `pnpm docker:build` → build production image
  - `pnpm docker:prod` → run full production stack locally
- Update `.env.example` with Docker-compatible connection strings

#### Acceptance Criteria

- [ ] `docker compose up -d` starts MongoDB + Redis
- [ ] MongoDB accessible at `localhost:27017`
- [ ] Redis accessible at `localhost:6379`
- [ ] Data persists across `docker compose down` and `up` (volumes)
- [ ] Backend connects to Docker MongoDB and Redis via env vars
- [ ] Production compose builds and runs complete stack

#### Test Criteria

- `docker compose up` starts without errors
- Backend health endpoint shows db: connected, redis: connected
- Data persists after container restart
- Production compose serves frontend and API

#### Dependencies

- M0-6, M3-1

---

### Issue M3-3: GitHub Actions — Docker Build & Push Workflow

**Labels**: `milestone:M3` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Extend the CI/CD pipeline to build a Docker image and push it to a container registry (Docker Hub or GitHub Container Registry) after all tests pass.

#### Requirements

- Add to `.github/workflows/ci.yml` or create `.github/workflows/deploy.yml`:
- Job: `build-and-push` (needs: `e2e-tests`)
  - Triggers only on push to `develop` or `main`
  - Build Docker image with build args (commit SHA, build date)
  - Tag image: `latest`, `develop-{sha}`, or `v{version}`
  - Push to GitHub Container Registry (ghcr.io)
  - Cache Docker layers for faster subsequent builds
- Create deploy job: `deploy-staging` (needs: `build-and-push`)
  - Triggers only on push to `develop`
  - SSH into CloudClusters VPS
  - Pull latest image
  - Docker compose down → pull → up
  - Health check verification after deploy
- Store Docker registry credentials and SSH keys as GitHub Secrets

#### Acceptance Criteria

- [ ] Docker image built automatically after tests pass
- [ ] Image pushed to container registry with proper tags
- [ ] Docker layer caching reduces build time on subsequent runs
- [ ] Deploy job SSHs into staging and updates running containers
- [ ] Health check verifies deployment success
- [ ] Workflow only deploys from `develop` branch (not feature branches)

#### Test Criteria

- Push to `develop` → image built and pushed to registry
- Push to feature branch → no image built or deployed
- Deploy job verifies health endpoint after deployment
- Failed health check marks deployment as failed

#### Dependencies

- M2-3, M3-1

---

### Issue M3-4: Staging Health Check & Monitoring Endpoint

**Labels**: `milestone:M3` `type:backend` `priority:high`
**Estimate**: 1 day

#### Context

Enhance the health check endpoint to serve as a comprehensive monitoring endpoint. This is used by the CD pipeline and CloudClusters to verify deployment health.

#### Requirements

- Enhance `GET /api/v1/health` to return detailed status:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-08-18T12:00:00Z",
    "uptime": 3600,
    "version": "1.0.0",
    "commit": "abc123",
    "environment": "staging",
    "services": {
      "database": { "status": "connected", "latency": "5ms" },
      "redis": { "status": "connected", "latency": "2ms" }
    }
  }
  ```
- Add `GET /api/v1/health/ready` — readiness probe (returns 200 only when DB + Redis connected)
- Add `GET /api/v1/health/live` — liveness probe (returns 200 if process is alive)
- Read `COMMIT_SHA` and `APP_VERSION` from environment (injected during Docker build)
- Measure actual DB and Redis ping latency
- Add request logging middleware that logs request duration for monitoring

#### Acceptance Criteria

- [ ] Health endpoint returns all service statuses with latency
- [ ] `/health/ready` returns 503 if DB is disconnected
- [ ] `/health/live` always returns 200 if server is running
- [ ] Version and commit SHA visible in health response
- [ ] Environment name (staging/production) visible in response
- [ ] Request logging shows method, path, status code, and duration

#### Test Criteria

- Health endpoint returns correct structure (Supertest)
- Ready endpoint returns 503 when DB disconnected (mock)
- Live endpoint always returns 200
- Latency values are realistic numbers (not null/zero)

#### Dependencies

- M0-6

---

---

## M4 — CloudClusters & Domain

> **Goal**: Set up the CloudClusters VPS, deploy the Docker stack, configure domain mapping, and enable SSL. After this milestone, you have a live staging environment.

---

### Issue M4-1: CloudClusters VPS Setup & Docker Configuration

**Labels**: `milestone:M4` `type:devops` `priority:critical`
**Estimate**: 2 days

#### Context

Provision and configure the CloudClusters VPS for hosting the Docker-based application stack. Install Docker, configure firewall, and set up the initial deployment manually.

#### Requirements

- Provision CloudClusters VPS (Ubuntu 24.04 LTS recommended)
- Install Docker Engine and Docker Compose on VPS
- Configure UFW firewall: allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), deny all others
- Create deployment user (`deploy`) with Docker group permissions
- Set up SSH key-based authentication (disable password auth)
- Create project directory structure on VPS: `/opt/doctor-app/`
- Copy `docker-compose.prod.yml` and `.env.production` to VPS
- Create MongoDB data volume and Redis data volume
- First manual deployment: pull image → docker compose up
- Verify application accessible on VPS IP address
- Document the full VPS setup process in `docs/deployment-guide.md`

#### Acceptance Criteria

- [ ] VPS accessible via SSH with key-based auth
- [ ] Docker and Docker Compose installed and running
- [ ] Firewall configured (ports 22, 80, 443 only)
- [ ] Application running via Docker Compose on VPS
- [ ] Health endpoint accessible at `http://<VPS-IP>:5000/api/v1/health`
- [ ] MongoDB and Redis running with persistent volumes
- [ ] Deployment guide documented

#### Test Criteria

- SSH connection works with deploy key
- `docker ps` shows all containers running on VPS
- Health endpoint returns OK from external network
- Firewall blocks non-allowed ports (test with nmap or telnet)

#### Dependencies

- M3-1, M3-2

---

### Issue M4-2: Domain Mapping & Nginx Reverse Proxy

**Labels**: `milestone:M4` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Configure domain DNS records and set up Nginx as a reverse proxy to route traffic to the Docker application.

#### Requirements

- Configure DNS A records:
  - `staging.yourdomain.com` → VPS IP address
  - (Optional) `api-staging.yourdomain.com` → VPS IP (if separate API subdomain)
- Install Nginx on VPS (or use Nginx Docker container)
- Create Nginx server block configuration:
  - Proxy pass to Docker app on port 5000
  - WebSocket upgrade headers for Socket.io (`/socket.io/`)
  - Gzip compression enabled
  - Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
  - Client max body size: 10MB (for file uploads)
- Test domain resolves to VPS and serves the application
- Add Nginx config to version control (`infra/nginx/`)

#### Acceptance Criteria

- [ ] `staging.yourdomain.com` resolves to VPS IP
- [ ] Application accessible via domain name (HTTP)
- [ ] Nginx proxies requests to Docker container
- [ ] WebSocket connections work through Nginx (Socket.io)
- [ ] File uploads up to 10MB work through Nginx
- [ ] Gzip compression active for text/JSON responses

#### Test Criteria

- Browser navigates to `staging.yourdomain.com` and loads patient app
- API calls work via `staging.yourdomain.com/api/v1/health`
- WebSocket connection establishes (check in browser DevTools)
- Upload a 5MB file → succeeds; upload 15MB → fails with 413

#### Dependencies

- M4-1

---

### Issue M4-3: SSL Certificate & HTTPS Configuration

**Labels**: `milestone:M4` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Install SSL certificate using Let's Encrypt (Certbot) and configure Nginx to serve all traffic over HTTPS with automatic HTTP → HTTPS redirect.

#### Requirements

- Install Certbot on VPS
- Obtain SSL certificate for `staging.yourdomain.com`
- Update Nginx configuration:
  - Redirect all HTTP (port 80) to HTTPS (port 443)
  - SSL certificate and key paths
  - TLS 1.2+ only (disable older protocols)
  - Strong cipher suite configuration
  - HSTS header (Strict-Transport-Security)
  - OCSP stapling enabled
- Set up Certbot auto-renewal cron job (renew every 60 days)
- Test HTTPS is working and grade on SSL Labs
- Update application CORS config to use `https://staging.yourdomain.com`
- Update `.env.production` with HTTPS domain URL

#### Acceptance Criteria

- [ ] `https://staging.yourdomain.com` serves application with valid certificate
- [ ] `http://staging.yourdomain.com` redirects to HTTPS
- [ ] SSL Labs grade A or A+
- [ ] HSTS header present in responses
- [ ] Certbot auto-renewal configured (cron or systemd timer)
- [ ] No mixed content warnings in browser
- [ ] Application CORS allows staging HTTPS origin

#### Test Criteria

- Navigate to HTTP → verify redirect to HTTPS
- Check SSL Labs score (aim for A+)
- Verify HSTS header in response headers
- API requests work over HTTPS
- WebSocket (WSS) works over HTTPS

#### Dependencies

- M4-2

---

---

## M5 — Authentication & User System

> **Goal**: First real feature. Complete authentication system with JWT, OAuth, OTP, RBAC, and user profile management. This is the foundation for all protected routes.

---

### Issue M5-1: User Model & Registration API

**Labels**: `milestone:M5` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Create the User Mongoose model and the registration API endpoint. Users can register as patients with email, password, name, and phone number. Passwords hashed with bcryptjs.

#### Requirements

- Create `User.model.ts` with Mongoose schema:
  - Fields: name, email (unique, indexed), phone (unique, indexed), password (hashed), role (enum from shared), profile (Object), familyMembers (Array), avatar, isEmailVerified, isPhoneVerified, refreshToken, createdAt, updatedAt
  - Pre-save hook: hash password with bcryptjs (salt rounds = 12)
  - Instance method: `comparePassword(candidatePassword)`
  - Static method: `findByEmail(email)`
- Create `auth.service.ts` with `registerUser(data)` business logic
- Create `auth.controller.ts` with `register` handler
- Create `auth.routes.ts` with `POST /api/v1/auth/register`
- Validate input using Zod schema from shared package (via `validate.middleware.ts`)
- Return sanitized user (no password field) + JWT token

#### Acceptance Criteria

- [ ] `POST /api/v1/auth/register` creates user and returns 201
- [ ] Password stored as bcrypt hash (not plaintext)
- [ ] Duplicate email returns 409 Conflict
- [ ] Invalid email format returns 400 with validation errors
- [ ] Password must be 8+ characters with at least 1 uppercase, 1 number
- [ ] Response excludes password field
- [ ] JWT access token returned in response

#### Test Criteria

- Register with valid data → 201 + user + token
- Register with duplicate email → 409
- Register with invalid email → 400 with field error
- Register with short password → 400
- Stored password is bcrypt hash (not plaintext)
- Returned user object has no password field

#### Dependencies

- M0-5, M0-6, M1-1

---

### Issue M5-2: Login API & JWT Token System

**Labels**: `milestone:M5` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Implement login endpoint with JWT access token (15 min) + refresh token (7 days) system. Access token sent in response body; refresh token stored as HttpOnly cookie.

#### Requirements

- Create login logic in `auth.service.ts`:
  - Find user by email, compare password
  - Generate access token (JWT, 15 min expiry)
  - Generate refresh token (JWT, 7 days expiry)
  - Store refresh token hash in user document
- Create `auth.controller.ts` handlers: `login`, `refreshToken`, `logout`
- Create routes:
  - `POST /api/v1/auth/login` → returns access token + sets refresh cookie
  - `POST /api/v1/auth/refresh-token` → returns new access token from refresh cookie
  - `POST /api/v1/auth/logout` → clears refresh cookie + invalidates token in DB
- Create `auth.middleware.ts`:
  - Extract Bearer token from Authorization header
  - Verify JWT, attach `req.user` with userId and role
  - Return 401 if token invalid/expired
- Create `GET /api/v1/auth/me` → returns current user profile (protected route)
- Create JWT utility: `src/utils/jwt.ts` (sign, verify, decode)

#### Acceptance Criteria

- [ ] Login with correct credentials returns access token + sets refresh cookie
- [ ] Login with wrong password returns 401
- [ ] Login with non-existent email returns 401 (same error message — no enumeration)
- [ ] Access token expires after 15 minutes
- [ ] Refresh token endpoint issues new access token
- [ ] Logout clears refresh cookie and invalidates token in DB
- [ ] `GET /auth/me` returns user when authenticated
- [ ] `GET /auth/me` returns 401 when not authenticated

#### Test Criteria

- Login success → 200 + token + cookie
- Login wrong password → 401
- Login non-existent user → 401 (same error as wrong password)
- Expired access token → 401 on protected route
- Refresh token → new valid access token
- Logout → refresh cookie cleared
- Auth middleware blocks unauthenticated requests

#### Dependencies

- M5-1

---

### Issue M5-3: Google OAuth Integration

**Labels**: `milestone:M5` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Implement Google OAuth 2.0 login. Frontend initiates Google sign-in, sends the ID token to the backend, which verifies it and creates/logs in the user.

#### Requirements

- Install Google Auth library for token verification on backend
- Create `POST /api/v1/auth/google` endpoint:
  - Receive Google ID token from frontend
  - Verify token with Google's servers
  - Extract email, name, profile picture from token payload
  - If user exists with email → login (return tokens)
  - If user doesn't exist → create new user (password field null, authProvider: 'google') → return tokens
- Frontend (Patient App):
  - Add Google Sign-In button on login/register pages
  - Use Google Identity Services library
  - On success, send ID token to backend
- Handle edge case: user registered with email/password tries Google login (link accounts)

#### Acceptance Criteria

- [ ] Google sign-in button visible on patient app login page
- [ ] Clicking Google button initiates OAuth flow
- [ ] New Google user → account created + logged in
- [ ] Existing Google user → logged in
- [ ] Google profile picture saved as avatar
- [ ] User with same email (password auth) can link Google account

#### Test Criteria

- Mock Google token verification → user created in DB
- Duplicate email (existing user) → logs in, doesn't create duplicate
- Invalid Google token → 401
- Frontend Google button renders correctly

#### Dependencies

- M5-2

---

### Issue M5-4: Forgot Password & Reset Password Flow

**Labels**: `milestone:M5` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Implement password reset flow: user requests reset via email, receives a time-limited token link, and sets a new password.

#### Requirements

- Create `POST /api/v1/auth/forgot-password`:
  - Accept email, find user
  - Generate random reset token (crypto), hash it, store in DB with 30-min expiry
  - Send email with reset link: `https://domain.com/reset-password?token=<token>`
  - Always return 200 (even if email not found — prevent enumeration)
- Create `POST /api/v1/auth/reset-password`:
  - Accept token + new password
  - Find user by hashed token where expiry > now
  - Hash new password, update in DB
  - Clear reset token fields
  - Invalidate all existing refresh tokens (force re-login)
- Create Nodemailer config (`src/config/email.ts`):
  - SMTP transport using env variables
  - HTML email template for password reset
- Frontend: Create Forgot Password page and Reset Password page in patient app

#### Acceptance Criteria

- [ ] Forgot password sends email with reset link
- [ ] Reset link works within 30 minutes
- [ ] Expired reset token returns 400
- [ ] Password successfully changed after reset
- [ ] All existing sessions invalidated after reset
- [ ] Non-existent email still returns 200 (no enumeration)

#### Test Criteria

- Forgot password with valid email → reset token created in DB
- Forgot password with invalid email → 200 (no error leak)
- Reset with valid token → password changed
- Reset with expired token → 400
- Reset with used token → 400 (token consumed)
- After reset, old access tokens rejected

#### Dependencies

- M5-2

---

### Issue M5-5: RBAC Middleware & Role-Based Authorization

**Labels**: `milestone:M5` `type:feature` `priority:critical`
**Estimate**: 1 day

#### Context

Create the Role-Based Access Control middleware that restricts API endpoints based on user roles. This is critical for separating patient vs. admin functionality.

#### Requirements

- Create `rbac.middleware.ts`:
  - Accept allowed roles as parameter: `authorize('admin', 'superAdmin')`
  - Check `req.user.role` against allowed roles
  - Return 403 Forbidden if role not authorized
- Define role hierarchy in shared constants:
  ```
  superAdmin > admin > receptionist > doctor > labTech > patient
  ```
- Create permission matrix:
  - Patient: own appointments, own records, own profile
  - Doctor: own schedule, assigned appointments, prescriptions
  - Receptionist: all appointments, walk-in registration, queue management
  - Admin: everything except system settings
  - Super Admin: everything including settings and audit logs
- Apply RBAC to existing routes:
  - `GET /auth/me` → any authenticated user
  - Admin routes → admin, superAdmin
- Create `ownership.middleware.ts` for resource-level checks (user can only access their own data)

#### Acceptance Criteria

- [ ] Patient cannot access admin routes (403)
- [ ] Admin can access admin routes
- [ ] Super Admin can access everything
- [ ] Receptionist can access appointment routes but not finance routes
- [ ] Doctor can only view their own schedule
- [ ] Patient can only view their own appointments
- [ ] Ownership middleware prevents user A from accessing user B's data

#### Test Criteria

- Patient token → admin route → 403
- Admin token → admin route → 200
- Super Admin token → any route → 200
- Patient A token → Patient B's appointment → 403
- Patient A token → Patient A's appointment → 200

#### Dependencies

- M5-2

---

### Issue M5-6: User Profile Management & Family Members

**Labels**: `milestone:M5` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Build the user profile management feature — edit personal details, upload profile photo, and manage family member profiles for dependent booking.

#### Requirements

- Backend:
  - `PATCH /api/v1/users/profile` — update profile (name, age, gender, blood group, allergies, medical history)
  - `POST /api/v1/users/avatar` — upload profile photo (Multer + Cloudinary)
  - `POST /api/v1/users/family` — add family member
  - `PATCH /api/v1/users/family/:id` — edit family member
  - `DELETE /api/v1/users/family/:id` — remove family member
  - Configure Cloudinary (`src/config/cloudinary.ts`)
  - Validate file type (JPEG, PNG only) and size (5MB max)
- Frontend (Patient App):
  - Create Profile page with editable form (react-hook-form + Zod)
  - Photo upload with preview (react-dropzone)
  - Family members section: add/edit/delete cards
  - Connect to RTK Query endpoints
- Create `userApi.ts` RTK Query slice with all profile endpoints

#### Acceptance Criteria

- [ ] User can view and edit their profile details
- [ ] Profile photo uploads to Cloudinary and URL saved in DB
- [ ] Invalid file types rejected (only JPEG, PNG)
- [ ] Family members CRUD works (add, edit, delete)
- [ ] Profile form validates using Zod schemas
- [ ] Photo preview shows before upload
- [ ] Profile page uses RTK Query for data fetching

#### Test Criteria

- Update profile → DB reflects changes
- Upload valid photo → Cloudinary URL returned
- Upload invalid file type → 400
- Upload oversized file → 400
- Add family member → appears in user's familyMembers array
- Delete family member → removed from array
- Frontend form validation prevents invalid submissions

#### Dependencies

- M5-2

---

---

## M6 — Doctor & Search

> **Goal**: Doctor profiles, specialties, search with filters, availability/slot system, and doctor profile page on the patient app.

---

### Issue M6-1: Doctor & Hospital Models

**Labels**: `milestone:M6` `type:feature` `priority:critical`
**Estimate**: 1 day

#### Context

Create the Doctor, Hospital, and Department Mongoose models. Seed the database with sample specialties and a default hospital.

#### Requirements

- Create `Doctor.model.ts`: userId (ref), hospitalId (ref), departmentId (ref), specialization (enum), experience (years), consultationFee, telemedicineFee, qualifications (array), bio, languages (array), availability (weekly schedule object), rating (default 0), totalReviews (default 0), slug (unique, indexed), isActive
- Create `Hospital.model.ts`: name, logo, description, branches (array of {address, city, state, pincode, phone}), workingHours, holidays, bookingPolicy ({cancellationWindow, reschedulingAllowed, refundPercentage}), isActive
- Create `Department.model.ts`: hospitalId (ref), name, description, icon, isActive
- Create database seed script (`src/scripts/seed.ts`):
  - Create a default hospital
  - Create all departments (Cardiology, Orthopedics, Dermatology, Pediatrics, Gynecology, Neurology, Ophthalmology, ENT, General Medicine, Dental)
  - Create 5-10 sample doctors with realistic data
- Add seed script to package.json: `pnpm --filter server seed`

#### Acceptance Criteria

- [ ] All three models created with proper TypeScript types
- [ ] Indexes on: doctor.slug, doctor.specialization, doctor.hospitalId
- [ ] Doctor slug auto-generated from name using slugify
- [ ] Seed script creates hospital + departments + sample doctors
- [ ] Seed script is idempotent (safe to run multiple times)
- [ ] Models reference each other correctly (populate works)

#### Test Criteria

- Create doctor with valid data → saved with auto-generated slug
- Doctor populate with hospital and department → returns nested data
- Duplicate slug → unique constraint error
- Seed script runs without errors on empty DB
- Seed script runs without errors on already-seeded DB (idempotent)

#### Dependencies

- M0-6

---

### Issue M6-2: Doctor Search & Filter API

**Labels**: `milestone:M6` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the doctor search API with full-text search, specialty filtering, advanced filters, sorting, and pagination. This is the primary discovery mechanism for patients.

#### Requirements

- Create `doctor.service.ts` with `searchDoctors(filters)`:
  - Full-text search across name, specialization, hospital name
  - Filter by: specialization, experience range, fee range, rating range, languages, availability day
  - Sort by: rating (desc), experience (desc), fee (asc/desc), name (asc)
  - Pagination: page, limit (default 10, max 50)
  - Return total count for pagination metadata
- Create `doctor.controller.ts` with `getDoctors`, `getDoctorById`, `getSpecialties`
- Create `doctor.routes.ts`:
  - `GET /api/v1/doctors` — search with query params
  - `GET /api/v1/doctors/specialties` — list all specialties
  - `GET /api/v1/doctors/:idOrSlug` — get single doctor (populate hospital, department, reviews summary)
- Create MongoDB text index on doctor name and specialization
- Implement Redis caching for specialty list (5 min TTL)

#### Acceptance Criteria

- [ ] Search by name returns matching doctors
- [ ] Filter by specialization returns correct subset
- [ ] Filter by fee range works (min, max)
- [ ] Filter by experience range works
- [ ] Pagination returns correct page with total count
- [ ] Sort by rating descending works
- [ ] Doctor detail includes populated hospital and department
- [ ] Specialty list cached in Redis

#### Test Criteria

- Search "cardio" → returns cardiologists
- Filter specialization=Cardiology → only cardiologists
- Filter fee min=500 max=1000 → correct subset
- Page 1 limit 5 → 5 results with correct total
- Sort by rating → highest rated first
- Get doctor by slug → correct doctor
- Get doctor by ID → correct doctor
- Specialty list returns all departments

#### Dependencies

- M6-1

---

### Issue M6-3: Doctor Availability & Slot Generation

**Labels**: `milestone:M6` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the slot availability system. Each doctor has a weekly schedule defining their working hours. The system generates available time slots for any given date, excluding already-booked slots.

#### Requirements

- Doctor availability schema in model:
  ```typescript
  availability: {
    monday: { isAvailable: true, slots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }] },
    tuesday: { isAvailable: true, slots: [...] },
    // ... all 7 days
  }
  slotDuration: 30 // minutes
  ```
- Create `booking.service.ts` → `getAvailableSlots(doctorId, date)`:
  - Get day of week from date
  - Generate time slots based on doctor's schedule and slotDuration
  - Query existing appointments for that doctor on that date
  - Exclude booked slots
  - Check if date is a hospital holiday → return empty
  - Check if doctor has leave on that date → return empty
  - Don't return past slots for today's date
- Create route: `GET /api/v1/doctors/:id/slots?date=2026-09-01`
- Return slots with status: `available` or `booked`
- Use dayjs for date/time manipulation

#### Acceptance Criteria

- [ ] Slots generated based on doctor's weekly schedule
- [ ] Booked slots excluded from available list
- [ ] Hospital holidays return empty slots
- [ ] Past time slots for today are excluded
- [ ] Slot duration configurable per doctor (15, 20, 30 min)
- [ ] Response includes both available and booked slots with status

#### Test Criteria

- Monday with schedule 9-12 + 14-17, 30min slots → 12 total slots
- Book 10:00 slot → that slot shows as booked
- Query holiday date → empty slots
- Query past date → empty slots (or only future slots for today)
- Doctor with no schedule for Wednesday → empty on Wednesday

#### Dependencies

- M6-1

---

### Issue M6-4: Patient App — Doctor Search Page

**Labels**: `milestone:M6` `type:frontend` `priority:critical`
**Estimate**: 2 days

#### Context

Build the Doctor Search page on the patient app with specialty quick-links, search bar, advanced filters sidebar, doctor cards, and pagination.

#### Requirements

- Create RTK Query API: `doctorApi.ts` (getDoctors, getDoctorById, getSpecialties, getAvailableSlots)
- Create Doctor Search page (`pages/DoctorSearch/`):
  - Search bar with real-time search (debounced 300ms)
  - Specialty filter chips (clickable)
  - Advanced filter sidebar: experience slider, fee range, rating, languages
  - Doctor cards grid showing: photo, name, specialty, experience, rating, fee, "Book Now" button
  - Pagination (page numbers or infinite scroll)
  - Loading skeleton while fetching
  - Empty state: "No doctors found matching your criteria"
- Responsive: cards stack vertically on mobile
- Add specialty icons from Lucide React
- Use react-hot-toast for any error notifications

#### Acceptance Criteria

- [ ] Search bar filters doctors in real-time
- [ ] Specialty chips filter correctly
- [ ] Advanced filters work (fee range, experience, rating)
- [ ] Doctor cards show all required information
- [ ] Pagination works (next/prev or page numbers)
- [ ] Loading skeleton shows while fetching
- [ ] Empty state shows when no results
- [ ] Responsive layout (mobile stacks to single column)
- [ ] RTK Query caches results (navigating back doesn't re-fetch)

#### Test Criteria

- Component test: renders doctor cards from mock data
- Component test: search input triggers filter
- Component test: empty state shows when no results
- E2E test: navigate to search → see doctors → filter by specialty
- RTK Query test: verify API call with MSW mock

#### Dependencies

- M6-2, M5-6

---

### Issue M6-5: Patient App — Doctor Profile Page

**Labels**: `milestone:M6` `type:frontend` `priority:critical`
**Estimate**: 2 days

#### Context

Build the detailed Doctor Profile page showing doctor information, qualifications, availability calendar, reviews summary, and a "Book Appointment" CTA.

#### Requirements

- Create Doctor Profile page (`pages/DoctorProfile/`):
  - Doctor header: photo, name, specialty, experience, rating stars, consultation fee
  - Tabs or sections: About, Qualifications, Availability, Reviews
  - About: bio, languages spoken, hospital affiliation
  - Qualifications: education list, certifications
  - Availability: date picker → shows available slots for selected date
  - Reviews: aggregated rating bar chart + latest 5 reviews (paginated)
  - "Book In-Person" and "Book Video Consultation" CTA buttons
  - Fee display: differentiate in-person vs. telemedicine fee
- Date picker for slot selection (styled calendar component)
- Slot grid: clickable time slot buttons (available in green, booked in gray)
- Selected slot highlighted → CTA enabled
- Responsive design for mobile
- Use Framer Motion for tab transitions

#### Acceptance Criteria

- [ ] Doctor profile loads all details correctly
- [ ] Date picker shows available dates
- [ ] Slot grid shows available/booked slots for selected date
- [ ] Clicking a slot selects it (visual feedback)
- [ ] CTA buttons enabled only when slot selected
- [ ] In-person and telemedicine fees displayed separately
- [ ] Reviews section shows rating breakdown + latest reviews
- [ ] Page is SEO-friendly (react-helmet-async with doctor name in title)

#### Test Criteria

- Component test: renders doctor details from mock data
- Component test: selecting a date fetches slots
- Component test: selecting a slot enables CTA
- E2E test: navigate to doctor profile → select date → see slots
- RTK Query test: doctor detail + slots API calls with MSW

#### Dependencies

- M6-3, M6-4

---

---

## M7 — Appointment Booking

> **Goal**: Complete appointment booking workflow — book, reschedule, cancel, view appointments, waitlist, and calendar view for patients.

---

### Issue M7-1: Appointment Model & Booking API

**Labels**: `milestone:M7` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Create the Appointment model and the booking API. When a patient books, a pending appointment is created and a payment order is initiated.

#### Requirements

- Create `Appointment.model.ts`: patientId, doctorId, hospitalId, departmentId, date, timeSlot, mode (in-person/telemedicine), type (instant/request), status (enum: pending, confirmed, inProgress, completed, cancelled, noShow), bookingFor (self/family member), familyMemberId, dailyRoomUrl, tokenNumber, notes, cancelReason, cancelledBy, createdAt, updatedAt
- Create booking logic in `booking.service.ts`:
  - Validate slot is available (not already booked)
  - Validate date is not in the past
  - Validate doctor is active and available on that day
  - Create appointment with status: `pending`
  - Return appointment ID for payment processing
- Create `appointment.controller.ts`: `bookAppointment`, `getMyAppointments`, `getAppointmentById`
- Create routes:
  - `POST /api/v1/appointments` (protected, patient)
  - `GET /api/v1/appointments` (protected, patient — own appointments)
  - `GET /api/v1/appointments/:id` (protected, patient — own appointment detail)
- Prevent double-booking: same doctor + same date + same time slot
- Generate unique appointment reference: `APT-XXXXXXXX`

#### Acceptance Criteria

- [ ] Booking creates appointment with pending status
- [ ] Double-booking same slot returns 409 Conflict
- [ ] Past date booking returns 400
- [ ] Inactive doctor booking returns 400
- [ ] Appointment ID generated as `APT-XXXXXXXX`
- [ ] My Appointments returns only logged-in user's appointments
- [ ] Appointment detail includes populated doctor and hospital info
- [ ] Booking for family member stores familyMemberId

#### Test Criteria

- Book valid slot → 201 + appointment
- Book already-taken slot → 409
- Book past date → 400
- Book inactive doctor → 400
- Get my appointments → only my appointments
- Get appointment detail → populated with doctor info

#### Dependencies

- M6-3, M5-5

---

### Issue M7-2: Reschedule & Cancel Appointment API

**Labels**: `milestone:M7` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Implement appointment rescheduling and cancellation logic with hospital booking policy enforcement (cancellation window, refund rules).

#### Requirements

- Create `rescheduleAppointment(appointmentId, newDate, newSlot)` in booking service:
  - Validate appointment belongs to user
  - Validate new slot is available
  - Validate within rescheduling policy (e.g., at least 2 hours before)
  - Release old slot, assign new slot
  - Update appointment date and time
  - Keep same payment record
  - Trigger notification to patient + doctor
- Create `cancelAppointment(appointmentId, reason)`:
  - Validate appointment belongs to user or admin
  - Validate within cancellation window
  - Calculate refund percentage based on timing:
    - 24h+ before: 100% refund
    - 12-24h before: 50% refund
    - < 12h before: no refund
  - Update status to `cancelled`
  - Initiate refund if applicable
  - Release the time slot
- Create routes:
  - `PATCH /api/v1/appointments/:id/reschedule`
  - `PATCH /api/v1/appointments/:id/cancel`
- Store cancellation policy in Hospital model (configurable by admin)

#### Acceptance Criteria

- [ ] Reschedule changes date/slot, keeps payment
- [ ] Old slot freed after reschedule
- [ ] New slot must be available
- [ ] Cancel within 24h → full refund
- [ ] Cancel 12-24h before → partial refund
- [ ] Cancel < 12h → no refund
- [ ] Cancel reason stored in appointment
- [ ] Completed/already-cancelled appointments can't be cancelled again

#### Test Criteria

- Reschedule to available slot → 200 + updated appointment
- Reschedule to taken slot → 409
- Cancel 24h+ before → full refund amount recorded
- Cancel 6h before → no refund
- Cancel completed appointment → 400
- Cancel by non-owner → 403

#### Dependencies

- M7-1

---

### Issue M7-3: Patient App — Booking Flow UI

**Labels**: `milestone:M7` `type:frontend` `priority:critical`
**Estimate**: 2 days

#### Context

Build the multi-step booking flow: Slot Selection → Booking Summary → Payment → Confirmation. This connects the doctor profile page to the payment system.

#### Requirements

- Create Booking page (`pages/Booking/`):
  - Step 1: Slot Selection (pre-filled from doctor profile or fresh selection)
  - Step 2: Booking Summary — doctor info, date, time, mode, fee, "Book for" (self/family member dropdown)
  - Step 3: Payment (placeholder — full implementation in M8)
  - Step 4: Confirmation — booking reference, doctor info, date/time, meeting link (if telemedicine)
- Create RTK Query: `appointmentApi.ts` (bookAppointment, getMyAppointments, getAppointmentById, reschedule, cancel)
- Add step indicator (progress bar) showing current step
- "Book for" dropdown shows self + family members from profile
- Confirmation page has "View My Appointments" and "Book Another" buttons
- Handle booking errors with toast notifications
- Responsive design for mobile

#### Acceptance Criteria

- [ ] Multi-step flow navigates correctly
- [ ] Step indicator shows progress
- [ ] Booking summary shows all correct details
- [ ] "Book for" allows selecting family members
- [ ] Confirmation shows reference number and details
- [ ] Back button works in each step
- [ ] Error toast on booking failure
- [ ] Mobile-responsive layout

#### Test Criteria

- Component test: step indicator renders correct steps
- Component test: booking summary shows passed data
- Component test: confirmation shows reference number
- E2E test: complete booking flow (select slot → summary → confirm)

#### Dependencies

- M7-1, M6-5

---

### Issue M7-4: Patient App — My Appointments Page

**Labels**: `milestone:M7` `type:frontend` `priority:critical`
**Estimate**: 2 days

#### Context

Build the "My Appointments" page where patients view their upcoming, past, and cancelled appointments with actions to reschedule, cancel, or join video call.

#### Requirements

- Create Appointments page (`pages/Appointments/`):
  - Tab view: Upcoming | Past | Cancelled
  - Appointment card showing: doctor photo, name, specialty, date, time, mode (icon), status badge
  - Action buttons per status:
    - Pending/Confirmed: "Reschedule", "Cancel", "Join Call" (if telemedicine & time is now)
    - Completed: "View Prescription", "Rate Doctor"
    - Cancelled: "Rebook" (link to same doctor's profile)
  - Reschedule modal: new date picker + slot selection
  - Cancel modal: reason input + refund info display + confirm button
- Status badges with colors: pending (yellow), confirmed (blue), in-progress (green), completed (gray), cancelled (red), no-show (orange)
- Empty state for each tab
- Sort by date (upcoming: nearest first, past: most recent first)
- Pull-to-refresh or refresh button

#### Acceptance Criteria

- [ ] Three tabs show correct appointments by status
- [ ] Appointment cards show all required info
- [ ] Reschedule opens modal with new date/slot picker
- [ ] Cancel shows refund info before confirming
- [ ] "Join Call" button visible only for telemedicine near appointment time
- [ ] Status badges render correct colors
- [ ] Empty states show for tabs with no appointments
- [ ] Appointments sorted by date correctly

#### Test Criteria

- Component test: renders upcoming appointments
- Component test: renders empty state for empty tab
- Component test: cancel modal shows refund percentage
- E2E test: view appointments → open cancel modal → confirm cancel

#### Dependencies

- M7-2, M7-3

---

### Issue M7-5: Waitlist Feature

**Labels**: `milestone:M7` `type:feature` `priority:medium`
**Estimate**: 1 day

#### Context

When all slots are booked for a doctor on a given date, patients can join a waitlist and get notified when a slot opens (due to cancellation or reschedule).

#### Requirements

- Add waitlist array to Appointment model or create separate Waitlist model:
  - patientId, doctorId, date, preferredSlots (array of preferred times), status (waiting/notified/expired), createdAt
- Create `POST /api/v1/appointments/waitlist` — join waitlist
- When a slot is freed (cancellation/reschedule):
  - Find waitlisted patients for that doctor + date
  - Notify first patient in queue (FIFO)
  - Hold slot for 15 minutes for them to book
  - If not booked in 15 minutes → notify next person
- Create `GET /api/v1/appointments/waitlist` — view my waitlist entries
- Create `DELETE /api/v1/appointments/waitlist/:id` — leave waitlist
- Frontend: "Join Waitlist" button appears when no slots available

#### Acceptance Criteria

- [ ] Patient can join waitlist when no slots available
- [ ] Slot cancellation triggers waitlist notification
- [ ] First patient in queue gets priority
- [ ] Slot held for 15 minutes for notified patient
- [ ] Patient can view and leave waitlist
- [ ] "Join Waitlist" button appears on fully booked dates

#### Test Criteria

- Join waitlist → entry created
- Cancel appointment → first waitlisted patient notified
- Two patients on waitlist → first gets notified first
- Leave waitlist → entry removed

#### Dependencies

- M7-2

---

### Issue M7-6: Appointment Status Transition API

**Labels**: `milestone:M7` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Create the appointment lifecycle state machine. Appointments transition through defined statuses with validation rules.

#### Requirements

- Define valid status transitions:
  ```
  pending → confirmed | cancelled
  confirmed → inProgress | cancelled | noShow
  inProgress → completed
  completed → (terminal)
  cancelled → (terminal)
  noShow → (terminal)
  ```
- Create `updateAppointmentStatus(appointmentId, newStatus)` in booking service:
  - Validate transition is allowed
  - Validate actor has permission (doctor/admin for most transitions)
  - Record timestamp for each transition
  - Auto-mark as no-show if 30 min past appointment time and not checked in (BullMQ delayed job)
- Create `PATCH /api/v1/admin/appointments/:id/status` (admin/doctor route)
- Emit Socket.io event on status change for real-time updates
- Store status history: `statusHistory: [{ status, changedBy, changedAt, reason }]`

#### Acceptance Criteria

- [ ] Valid transitions succeed
- [ ] Invalid transitions return 400 (e.g., completed → pending)
- [ ] Status history recorded with actor and timestamp
- [ ] Auto no-show after 30 minutes past appointment time
- [ ] Socket.io event emitted on status change
- [ ] Only authorized roles can change status

#### Test Criteria

- Pending → confirmed → 200
- Pending → completed → 400 (invalid transition)
- Completed → pending → 400 (terminal state)
- Status history contains all transitions
- Auto no-show job triggers after 30 min (mock timer)

#### Dependencies

- M7-1

---

---

## M8 — Payments (Razorpay)

> **Goal**: Full Razorpay integration — create order, checkout, verify, refund, invoice PDF, and payment history.

---

### Issue M8-1: Razorpay Configuration & Order Creation

**Labels**: `milestone:M8` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Integrate Razorpay payment gateway. Create payment orders when patients proceed to pay for appointments.

#### Requirements

- Install `razorpay@2.9.8`
- Create `src/config/razorpay.ts` — initialize Razorpay instance with key_id and key_secret from env
- Create `Payment.model.ts`: appointmentId, patientId, amount, currency (INR), status (created/paid/failed/refunded), method, razorpayOrderId, razorpayPaymentId, razorpaySignature, refundId, refundAmount, receiptNumber, invoiceUrl, paidAt, refundedAt
- Create `payment.service.ts`:
  - `createOrder(appointmentId)` — create Razorpay order with amount from doctor's fee
  - Generate unique receipt number: `RCP-XXXXXXXX`
  - Save payment record with status: `created`
- Create route: `POST /api/v1/payments/create-order`
  - Input: appointmentId
  - Output: razorpayOrderId, amount, currency, key_id (public key for frontend)
- Frontend: install Razorpay checkout script, create payment service

#### Acceptance Criteria

- [ ] Razorpay order created with correct amount
- [ ] Payment record saved in DB with razorpayOrderId
- [ ] Receipt number generated
- [ ] Frontend receives orderId and key for checkout
- [ ] Amount matches doctor's consultation fee
- [ ] Different fees for in-person vs. telemedicine

#### Test Criteria

- Create order → Razorpay API called (mock) → orderId returned
- Payment record created in DB with status: created
- Order amount matches appointment type fee
- Invalid appointmentId → 404

#### Dependencies

- M7-1

---

### Issue M8-2: Payment Verification & Appointment Confirmation

**Labels**: `milestone:M8` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

After patient completes payment on Razorpay checkout, verify the payment signature on the backend and confirm the appointment.

#### Requirements

- Create `POST /api/v1/payments/verify`:
  - Receive: razorpay_order_id, razorpay_payment_id, razorpay_signature
  - Verify signature using Razorpay's HMAC SHA256 verification
  - If valid: update payment status to `paid`, update appointment status to `confirmed`
  - If invalid: return 400, keep appointment as `pending`
  - Store razorpayPaymentId in payment record
  - Set paidAt timestamp
- Create Razorpay webhook handler (`POST /api/v1/payments/webhook`):
  - Handle `payment.captured` event as backup verification
  - Handle `payment.failed` event → cancel appointment
  - Verify webhook signature
- Frontend (Patient App):
  - Integrate Razorpay checkout modal in booking flow
  - On payment success → call verify API → show confirmation
  - On payment failure → show error toast + retry option
  - Handle payment modal close (user cancelled)

#### Acceptance Criteria

- [ ] Valid payment verified → appointment confirmed
- [ ] Invalid signature → verification fails with 400
- [ ] Razorpay checkout modal opens in patient app
- [ ] UPI, card, net banking options available in checkout
- [ ] Successful payment shows confirmation screen
- [ ] Failed payment shows error with retry
- [ ] Webhook handler processes events as backup

#### Test Criteria

- Verify with valid signature → 200 + payment confirmed
- Verify with invalid signature → 400
- After verification, appointment status is `confirmed`
- Webhook payment.captured → payment confirmed
- Webhook payment.failed → appointment cancelled

#### Dependencies

- M8-1, M7-3

---

### Issue M8-3: Refund Processing

**Labels**: `milestone:M8` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Process refunds via Razorpay when appointments are cancelled within the refund policy window.

#### Requirements

- Create `payment.service.ts` → `processRefund(appointmentId)`:
  - Get payment record, verify status is `paid`
  - Calculate refund amount based on cancellation policy
  - Call Razorpay refund API with payment ID and amount
  - Update payment record: status `refunded`, refundId, refundAmount, refundedAt
  - Handle partial refunds (50% scenarios)
- Integrate refund into `cancelAppointment` flow (M7-2)
- Create route: `POST /api/v1/payments/refund` (admin can force full refund)
- Create Razorpay webhook handler for `refund.processed` and `refund.failed`
- Track refund status in payment model

#### Acceptance Criteria

- [ ] Cancellation triggers automatic refund calculation
- [ ] Full refund when cancelled 24h+ before
- [ ] Partial refund (50%) when cancelled 12-24h before
- [ ] No refund when cancelled < 12h before
- [ ] Razorpay refund API called with correct amount
- [ ] Payment record updated with refund details
- [ ] Admin can force full refund regardless of policy

#### Test Criteria

- Cancel 24h+ before → full refund initiated (mock Razorpay)
- Cancel 18h before → 50% refund
- Cancel 6h before → no refund
- Admin force refund → full refund regardless
- Refund webhook → payment status updated

#### Dependencies

- M8-2, M7-2

---

### Issue M8-4: Invoice PDF Generation

**Labels**: `milestone:M8` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Generate downloadable PDF invoices for completed payments with all required details including GST information.

#### Requirements

- Install `pdfkit`
- Create `src/utils/pdfGenerator.ts`:
  - Generate invoice PDF with: hospital logo, invoice number, date, patient name, doctor name, appointment date/time, amount, payment method, transaction ID, GST breakdown (if applicable)
  - Template with professional layout (header, line items, totals, footer)
- Upload generated PDF to Cloudinary, store URL in payment record
- Create route: `GET /api/v1/payments/:id/invoice` → redirect to PDF URL (or stream PDF)
- Auto-generate invoice after successful payment verification
- Frontend: "Download Invoice" button on payment history and appointment details

#### Acceptance Criteria

- [ ] PDF invoice generated after payment verification
- [ ] Invoice contains all required fields
- [ ] PDF uploaded to Cloudinary
- [ ] Download endpoint returns PDF file
- [ ] Invoice number is unique and sequential
- [ ] Professional layout with hospital branding

#### Test Criteria

- Generate invoice → PDF created with correct data
- Download invoice → returns PDF content-type
- Invoice for non-existent payment → 404
- Invoice for unpaid appointment → 400

#### Dependencies

- M8-2

---

### Issue M8-5: Payment History Page

**Labels**: `milestone:M8` `type:frontend` `priority:high`
**Estimate**: 1 day

#### Context

Build the payment history page in the patient app showing all transactions with status, amounts, and invoice download options.

#### Requirements

- Create RTK Query: `paymentApi.ts` (getPaymentHistory, downloadInvoice)
- Create Payment History page or section within Profile:
  - Table/list: date, doctor name, amount, payment method, status badge, actions
  - Status badges: created (gray), paid (green), refunded (blue), failed (red)
  - "Download Invoice" button for paid transactions
  - "View Details" modal showing full transaction details
  - Filter by date range
  - Sort by date (most recent first)
- Mobile: cards instead of table rows
- Empty state for no payments

#### Acceptance Criteria

- [ ] Payment history shows all user's transactions
- [ ] Status badges render with correct colors
- [ ] Invoice download works for paid transactions
- [ ] Date filter works
- [ ] Details modal shows transaction info
- [ ] Responsive layout (table → cards on mobile)

#### Test Criteria

- Component test: renders payment list from mock data
- Component test: invoice download button triggers download
- Component test: status badges show correct colors

#### Dependencies

- M8-4

---

---

## M9 — Admin Dashboard

> **Goal**: Admin app comes alive — dashboard with analytics, doctor management, and appointment management with calendar view.

---

### Issue M9-1: Admin Authentication & Layout

**Labels**: `milestone:M9` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the admin authentication flow and the main admin layout with sidebar navigation, top bar, and protected routes.

#### Requirements

- Backend: Admin login uses same auth system but validates role is admin/superAdmin/receptionist/doctor
- Frontend (Admin App):
  - Login page (email + password)
  - Create admin layout component:
    - Collapsible sidebar with navigation items and icons
    - Top bar: hospital name/logo, user avatar, dropdown (profile, logout)
    - Main content area with breadcrumbs
  - Sidebar navigation items: Dashboard, Doctors, Appointments, Patients, Departments, Finance, Reports, Settings
  - Role-based menu visibility (receptionist sees fewer items than superAdmin)
  - Protected route wrapper: redirect to login if not authenticated
- Create RTK Query: `adminAuthApi.ts`
- Create auth slice for admin app

#### Acceptance Criteria

- [ ] Admin login works with correct credentials
- [ ] Patient role cannot login to admin app (403)
- [ ] Sidebar renders all navigation items
- [ ] Sidebar collapses on toggle (icon-only mode)
- [ ] Active route highlighted in sidebar
- [ ] User dropdown shows profile and logout
- [ ] Unauthenticated users redirected to login
- [ ] Role-based menu: receptionist sees subset

#### Test Criteria

- Login with admin credentials → redirected to dashboard
- Login with patient credentials → error shown
- Sidebar renders correct items for admin role
- Sidebar renders subset for receptionist role
- Unauthenticated route → redirect to login

#### Dependencies

- M5-5

---

### Issue M9-2: Admin Dashboard — Analytics & KPIs

**Labels**: `milestone:M9` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the main admin dashboard showing real-time KPIs, charts, and recent activity feed.

#### Requirements

- Backend: Create `analytics.service.ts` and `GET /api/v1/admin/dashboard`:
  - Today's KPIs: total appointments, completed, pending, cancelled, no-shows, revenue
  - Weekly/monthly revenue chart data (past 12 weeks/months)
  - Top 5 doctors by appointments this month
  - Patient growth chart (new registrations per month)
  - Department-wise appointment distribution (pie chart)
  - Recent activity feed (last 10 actions)
- Frontend (Admin App):
  - KPI cards row: appointments count, revenue (₹), patients, doctors (with trend arrows)
  - Revenue chart (Recharts: AreaChart or BarChart)
  - Appointments by department (PieChart)
  - Top doctors table (name, appointments, rating, revenue)
  - Recent activity feed (scrollable list)
- Auto-refresh dashboard every 60 seconds (RTK Query polling)
- Date range selector for charts (this week/month/quarter/year)

#### Acceptance Criteria

- [ ] Dashboard loads all KPIs correctly
- [ ] Revenue chart renders with correct data
- [ ] Pie chart shows department distribution
- [ ] Top doctors table shows top 5
- [ ] Activity feed shows recent actions
- [ ] Auto-refresh every 60 seconds
- [ ] Date range selector filters chart data
- [ ] KPI cards show trend arrows (up/down vs last period)

#### Test Criteria

- Dashboard API returns correct KPI calculations
- Revenue chart data matches DB aggregations
- Department distribution sums to total appointments
- Frontend renders charts without errors

#### Dependencies

- M9-1

---

### Issue M9-3: Admin — Doctor Management Panel

**Labels**: `milestone:M9` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the doctor management page where admins can add, edit, view, and remove doctors. Includes availability schedule configuration and fee setup.

#### Requirements

- Backend routes:
  - `POST /api/v1/admin/doctors` — add doctor (create user account + doctor profile)
  - `PUT /api/v1/admin/doctors/:id` — update doctor
  - `DELETE /api/v1/admin/doctors/:id` — soft delete (deactivate)
  - `PATCH /api/v1/admin/doctors/:id/availability` — update weekly schedule
  - `PATCH /api/v1/admin/doctors/:id/fees` — update consultation fees
- Frontend (Admin App):
  - Doctor list page: data table with search, filter by department, status badge (active/inactive)
  - Add Doctor modal/page: multi-step form (personal info → qualifications → schedule → fees)
  - Edit Doctor: pre-filled form with all fields
  - Availability editor: visual weekly schedule builder (drag to set hours per day)
  - Deactivate doctor: confirmation modal with warning about future appointments
- Create RTK Query: `adminDoctorApi.ts`

#### Acceptance Criteria

- [ ] Admin can add a new doctor (creates user + doctor profile)
- [ ] Doctor list with search and department filter
- [ ] Edit doctor updates all fields
- [ ] Deactivate doctor cancels future appointments with notification
- [ ] Weekly schedule editor works visually
- [ ] Fee update reflects on patient app
- [ ] Validation on all form fields

#### Test Criteria

- Add doctor API → user + doctor created in DB
- Edit doctor API → fields updated
- Deactivate doctor → isActive false, future appointments cancelled
- Frontend form validation prevents invalid data

#### Dependencies

- M6-1, M9-1

---

### Issue M9-4: Admin — Appointment Management (Calendar + List)

**Labels**: `milestone:M9` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the appointment management page with both calendar view (FullCalendar) and list view. Admins can filter, search, change status, and create walk-in appointments.

#### Requirements

- Backend:
  - `GET /api/v1/admin/appointments` — list all with filters (doctor, department, status, date range, mode)
  - `POST /api/v1/admin/appointments` — create walk-in appointment (no payment required)
  - `PATCH /api/v1/admin/appointments/:id/status` — update status
- Frontend (Admin App):
  - Toggle between Calendar View and List View
  - Calendar View (FullCalendar):
    - Day, week, month views
    - Appointments as color-coded events (by status)
    - Click event → appointment detail modal
    - Filter by doctor (resource view)
  - List View:
    - Data table: patient name, doctor, date, time, status, mode, actions
    - Filters: doctor dropdown, department, status, date range picker
    - Status change dropdown in each row
    - Walk-in appointment creation button
  - Walk-in modal: select doctor → select slot → patient details → create
  - Status change with confirmation

#### Acceptance Criteria

- [ ] Calendar view shows appointments as colored events
- [ ] Day/week/month views work
- [ ] Clicking event opens detail modal
- [ ] List view with all filters working
- [ ] Status can be changed from list view
- [ ] Walk-in appointment creation works
- [ ] Appointments color-coded by status

#### Test Criteria

- Admin appointments API returns filtered results
- Walk-in creation creates appointment without payment
- Status change updates correctly
- Calendar renders events from mock data
- Filters reduce displayed results correctly

#### Dependencies

- M7-6, M9-1

---

### Issue M9-5: Admin — Patient Directory

**Labels**: `milestone:M9` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Build the patient management page for admins to view, search, and manage patient records.

#### Requirements

- Backend:
  - `GET /api/v1/admin/patients` — list all patients with search (name, email, phone), pagination
  - `GET /api/v1/admin/patients/:id` — patient detail with appointment history
- Frontend (Admin App):
  - Patient directory: searchable data table (name, email, phone, total visits, last visit date)
  - Click row → patient detail page/modal:
    - Patient profile info
    - Appointment history (table)
    - Medical records list
    - "Register Walk-in" button (create new patient manually)
  - Walk-in patient registration form (name, phone, email — simplified)

#### Acceptance Criteria

- [ ] Patient list searchable by name, email, phone
- [ ] Pagination works
- [ ] Patient detail shows full history
- [ ] Walk-in registration creates patient account
- [ ] Total visits and last visit date calculated correctly

#### Test Criteria

- Search by name → matching patients returned
- Search by phone → correct patient found
- Patient detail includes appointment history
- Walk-in registration creates user in DB

#### Dependencies

- M9-1

---

### Issue M9-6: Admin — Department Management

**Labels**: `milestone:M9` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Build department management for admins to create, edit, delete departments and view doctor allocation per department.

#### Requirements

- Backend:
  - `POST /api/v1/admin/departments` — create department
  - `PUT /api/v1/admin/departments/:id` — update
  - `DELETE /api/v1/admin/departments/:id` — deactivate
  - `GET /api/v1/admin/departments` — list all with doctor count
- Frontend (Admin App):
  - Department grid/list: name, icon, doctor count, status
  - Add/Edit department modal (name, description, icon)
  - Click department → see assigned doctors
  - Drag-and-drop doctor assignment (optional)

#### Acceptance Criteria

- [ ] CRUD operations work for departments
- [ ] Doctor count per department is accurate
- [ ] Department deactivation handled gracefully
- [ ] Admin can view doctors per department

#### Test Criteria

- Create department → 201 + department
- Delete department with assigned doctors → warning/error
- Doctor count matches actual doctor assignments

#### Dependencies

- M6-1, M9-1

---

---

## M10 — Notifications

> **Goal**: Full notification system — email, SMS, push notifications, real-time updates via Socket.io, and background job queues.

---

### Issue M10-1: Email Notification System (Nodemailer)

**Labels**: `milestone:M10` `type:feature` `priority:critical`
**Estimate**: 2 days

#### Context

Build the email notification system with templated HTML emails for all appointment lifecycle events.

#### Requirements

- Configure Nodemailer with SMTP transport
- Create email templates (`src/utils/emailTemplates.ts`):
  - Welcome email (after registration)
  - Appointment confirmation (doctor, date, time, location)
  - Appointment reminder (24h before)
  - Appointment cancellation (with refund info)
  - Appointment rescheduled (new date/time)
  - Password reset email
  - Payment receipt
- Create `notification.service.ts` with `sendEmail(to, template, data)`
- HTML email templates with inline CSS (responsive, mobile-friendly)
- Queue emails via BullMQ (don't block request)
- Create `src/jobs/email.job.ts` — BullMQ worker for email queue

#### Acceptance Criteria

- [ ] Emails sent via BullMQ queue (non-blocking)
- [ ] All 7 email templates created with proper formatting
- [ ] Dynamic data injected into templates (patient name, doctor name, etc.)
- [ ] Emails render correctly in Gmail, Outlook (inline CSS)
- [ ] Failed email jobs retry 3 times
- [ ] Email sending logged in winston

#### Test Criteria

- Send email via service → job added to queue
- Email template renders with correct data
- Failed SMTP → job retries
- All templates produce valid HTML

#### Dependencies

- M5-4 (Nodemailer config already created)

---

### Issue M10-2: Push Notifications (Firebase Cloud Messaging)

**Labels**: `milestone:M10` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Implement browser push notifications using Firebase Cloud Messaging for real-time alerts.

#### Requirements

- Install `firebase-admin` on backend
- Create `src/config/firebase.ts` — initialize Firebase Admin SDK
- Create `notification.service.ts` → `sendPushNotification(userId, title, body, data)`
- Backend:
  - Store user's FCM token in User model
  - `POST /api/v1/users/fcm-token` — register device token
  - Send push on: appointment confirmed, reminder, cancellation, waitlist slot available
- Frontend (Patient App):
  - Request notification permission on first login
  - Register FCM token with backend
  - Handle foreground notifications (show toast)
  - Handle background notifications (system notification)
  - Create Firebase config and service worker
- Queue push notifications via BullMQ

#### Acceptance Criteria

- [ ] Permission prompt shown on first login
- [ ] FCM token stored in user record
- [ ] Push notification received when appointment confirmed
- [ ] Foreground: shown as toast notification
- [ ] Background: shown as system notification
- [ ] Push notifications queued via BullMQ

#### Test Criteria

- Register FCM token → stored in DB
- Send push → Firebase API called (mock)
- Foreground notification → toast displayed
- Failed push → logged and retried

#### Dependencies

- M5-2

---

### Issue M10-3: Real-time Updates (Socket.io)

**Labels**: `milestone:M10` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Implement Socket.io for real-time updates — appointment status changes, new notifications, and dashboard live data.

#### Requirements

- Install `socket.io` on backend, `socket.io-client` on frontends
- Create `src/socket/socket.ts`:
  - Initialize Socket.io with Express server
  - Authenticate connections via JWT (middleware)
  - Join user to their personal room (userId)
  - Join admins to admin room
- Create Socket.io event handlers:
  - `appointment:statusChanged` — emit to patient + doctor when status changes
  - `notification:new` — emit to user when new notification created
  - `appointment:new` — emit to admin dashboard when new booking
  - `dashboard:update` — emit to admin when KPIs change
- Frontend integration:
  - Create Socket.io context/provider
  - Auto-connect on login, disconnect on logout
  - Listen for events and update RTK Query cache (invalidate tags)
  - Visual indicator for connection status
- Configure Redis adapter for Socket.io (multi-instance scaling)

#### Acceptance Criteria

- [ ] Socket.io connects with JWT authentication
- [ ] Unauthorized connections rejected
- [ ] Appointment status change emits to patient in real-time
- [ ] Admin dashboard receives live updates
- [ ] New notification triggers UI update
- [ ] Connection status indicator shows connected/disconnected
- [ ] Redis adapter configured for scaling

#### Test Criteria

- Socket connects with valid token → success
- Socket connects with invalid token → rejected
- Status change → event received by correct user
- Admin room receives new appointment events
- Disconnect and reconnect works

#### Dependencies

- M5-2, M7-6

---

### Issue M10-4: BullMQ Background Job Queue (Reminders)

**Labels**: `milestone:M10` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Set up BullMQ job queues for background processing — appointment reminders, email delivery, and auto no-show marking.

#### Requirements

- Install `bullmq@6.1.2`
- Create queue manager: `src/jobs/queue.ts`
  - Reminder queue: send 24h and 1h reminders
  - Email queue: process email sending jobs
  - NoShow queue: auto-mark no-show after 30 min past appointment
- Create `src/jobs/reminder.job.ts`:
  - Schedule reminder when appointment is confirmed
  - 24h before: send email + push notification
  - 1h before: send SMS + push notification
  - Cancel scheduled reminders when appointment cancelled/rescheduled
- Create `src/jobs/report.job.ts`:
  - Placeholder for scheduled report generation
- Create BullMQ dashboard route (admin only) for monitoring queues
- Retry configuration: 3 retries with exponential backoff

#### Acceptance Criteria

- [ ] Reminder scheduled when appointment confirmed
- [ ] 24h reminder sends email + push
- [ ] 1h reminder sends SMS + push
- [ ] Cancelled appointment → reminders cancelled
- [ ] Rescheduled appointment → old reminders cancelled, new ones scheduled
- [ ] Failed jobs retry 3 times
- [ ] Queue monitoring available for admins

#### Test Criteria

- Confirm appointment → reminder jobs created in queue
- Cancel appointment → reminder jobs removed
- Job execution → email/push service called
- Failed job → retry with backoff

#### Dependencies

- M10-1, M10-2

---

### Issue M10-5: In-App Notification Center

**Labels**: `milestone:M10` `type:feature` `priority:medium`
**Estimate**: 1 day

#### Context

Build the in-app notification center — bell icon with unread count, notification feed, and mark as read functionality.

#### Requirements

- Create `Notification.model.ts`: userId, title, message, type (appointment/payment/system), link (deeplink to relevant page), isRead, createdAt
- Backend:
  - `GET /api/v1/notifications` — paginated list (newest first)
  - `PATCH /api/v1/notifications/:id/read` — mark as read
  - `PATCH /api/v1/notifications/read-all` — mark all as read
  - `GET /api/v1/notifications/unread-count` — count of unread
- Frontend (Both Apps):
  - Bell icon in header with unread count badge
  - Click bell → dropdown notification feed
  - Each notification: icon, title, message, time ago, read/unread styling
  - Click notification → navigate to relevant page
  - "Mark all as read" button
  - Real-time update via Socket.io (new notification → increment badge)

#### Acceptance Criteria

- [ ] Bell icon shows unread count
- [ ] Notification feed shows list with read/unread styling
- [ ] Mark as read works (individual and all)
- [ ] Click notification navigates to relevant page
- [ ] New notification via Socket.io updates badge in real-time
- [ ] Notifications paginated (load more on scroll)

#### Test Criteria

- Get notifications → returns user's notifications
- Mark as read → isRead updated
- Unread count matches actual unread
- Socket.io event → badge incremented

#### Dependencies

- M10-3

---

---

## M11 — Telemedicine

> **Goal**: Video consultation via Daily.co — room creation, video call page, in-call chat, and meeting link management.

---

### Issue M11-1: Daily.co Configuration & Room Management

**Labels**: `milestone:M11` `type:feature` `priority:critical`
**Estimate**: 1 day

#### Context

Set up Daily.co SDK on the backend for creating and managing video rooms for telemedicine appointments.

#### Requirements

- Install `@daily-co/daily-js`
- Create `src/config/daily.ts` — Daily.co API configuration
- Create `daily.service.ts`:
  - `createRoom(appointmentId)` — create Daily.co room with: name, privacy (private), exp (appointment time + 1h), enable_chat, enable_screenshare
  - `deleteRoom(roomName)` — clean up room after consultation
  - `getMeetingToken(roomId, userName, isOwner)` — generate meeting token for participants
- Auto-create room when telemedicine appointment is confirmed (in booking flow)
- Store `dailyRoomUrl` and `dailyRoomName` in Appointment model
- Create route: `GET /api/v1/appointments/:id/meeting` — returns room URL + meeting token
- Clean up expired rooms via scheduled job (node-cron)

#### Acceptance Criteria

- [ ] Daily.co room created on telemedicine appointment confirmation
- [ ] Room URL stored in appointment record
- [ ] Meeting token generated for patient and doctor (different permissions)
- [ ] Room expires 1 hour after appointment time
- [ ] Expired rooms cleaned up automatically
- [ ] Meeting endpoint returns room URL + token

#### Test Criteria

- Create room → Daily.co API called (mock) → URL returned
- Get meeting → returns URL + valid token
- Room creation for in-person appointment → skipped
- Expired room cleanup job runs without errors

#### Dependencies

- M7-1

---

### Issue M11-2: Video Call Page (Patient App)

**Labels**: `milestone:M11` `type:frontend` `priority:critical`
**Estimate**: 2 days

#### Context

Build the video consultation page using Daily.co's Prebuilt UI component for the patient app.

#### Requirements

- Install `@daily-co/daily-react`
- Create VideoCall page (`pages/VideoCall/`):
  - Pre-call screen: appointment details, doctor name, camera/mic preview, "Join Call" button
  - Video call: Daily.co Prebuilt component with full UI (camera, mic, screenshare, chat, leave)
  - Post-call screen: "Consultation ended" message, links to view prescription, rate doctor, back to appointments
- "Join Call" button:
  - Visible only when appointment status is `confirmed` or `inProgress`
  - Enabled only within 15 minutes before to 30 minutes after appointment time
  - Fetches meeting token from API before joining
- Handle edge cases:
  - Doctor hasn't joined yet → waiting room message
  - Network disconnection → reconnection attempt
  - Call ended by doctor → redirect to post-call screen
- Responsive: works on desktop and mobile browsers

#### Acceptance Criteria

- [ ] Pre-call screen shows appointment details and camera preview
- [ ] "Join Call" fetches token and connects to Daily.co room
- [ ] Video call interface shows camera, mic, chat, screenshare controls
- [ ] Post-call screen appears after call ends
- [ ] Join button disabled outside time window
- [ ] Works on mobile browsers
- [ ] Waiting room if doctor hasn't joined

#### Test Criteria

- Component test: pre-call screen renders appointment details
- Component test: join button disabled outside time window
- Component test: post-call screen renders with action buttons
- E2E test: navigate to video call page → see pre-call screen

#### Dependencies

- M11-1, M7-4

---

### Issue M11-3: Video Call — Doctor View (Admin App)

**Labels**: `milestone:M11` `type:frontend` `priority:high`
**Estimate**: 1 day

#### Context

Add video call capability to the admin app so doctors can join telemedicine consultations from their dashboard.

#### Requirements

- Create VideoCall page in admin app (similar to patient but with doctor perspective)
- Doctor's today's appointments show "Join Call" button for telemedicine
- Doctor has owner permissions in Daily.co room (can mute participants, end call for all)
- After call ends, doctor can:
  - Write prescription (link to prescription creation — M12)
  - Mark appointment as completed
  - Add consultation notes
- Add "Active Consultations" section to doctor's dashboard

#### Acceptance Criteria

- [ ] Doctor sees telemedicine appointments with "Join Call"
- [ ] Doctor joins as room owner (higher permissions)
- [ ] Post-call: option to write prescription and mark completed
- [ ] Active consultations section shows ongoing calls

#### Test Criteria

- Doctor's appointments show Join Call for telemedicine
- Doctor joins with owner permissions
- Mark completed after call → status updated

#### Dependencies

- M11-1, M9-4

---

### Issue M11-4: In-Call Chat & File Sharing

**Labels**: `milestone:M11` `type:feature` `priority:medium`
**Estimate**: 1 day

#### Context

Enable text chat and file sharing during video consultations for sharing reports, prescriptions, and notes.

#### Requirements

- Use Daily.co's built-in chat feature (already available in Prebuilt UI)
- Additional chat features via Socket.io for persistence:
  - Save chat messages to DB (linked to appointmentId)
  - File sharing: patient/doctor can upload images/documents during call
  - Files uploaded to Cloudinary, URL shared in chat
  - Chat history available after call ends (in appointment detail)
- Create chat message model or embed in Appointment
- Display chat history in appointment detail page (both apps)

#### Acceptance Criteria

- [ ] Text chat works during video call
- [ ] Files can be shared (upload → URL in chat)
- [ ] Chat messages saved to DB
- [ ] Chat history viewable after call ends
- [ ] File size limit enforced (10MB)

#### Test Criteria

- Send chat message → saved in DB
- Upload file in chat → Cloudinary URL in message
- View chat history after call → messages displayed

#### Dependencies

- M11-2, M11-3

---

---

## M12 — Records & Prescriptions

> **Goal**: Medical records upload/download, digital prescriptions, and health timeline.

---

### Issue M12-1: Medical Records Upload & Storage

**Labels**: `milestone:M12` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Build the medical records system where patients can upload, view, download, and delete their lab reports, scans, and documents.

#### Requirements

- Create `MedicalRecord.model.ts`: patientId, type (labReport/scan/prescription/other), title, description, fileUrl, fileType (pdf/jpeg/png), fileSize, uploadedBy (patient/doctor), appointmentId (optional), createdAt
- Backend routes:
  - `POST /api/v1/records/upload` — upload file (Multer + Cloudinary)
  - `GET /api/v1/records` — list patient's records (filter by type, date)
  - `GET /api/v1/records/:id/download` — download/redirect to file
  - `DELETE /api/v1/records/:id` — soft delete record
- File validation: JPEG, PNG, PDF only; max 10MB
- Cloudinary folder structure: `medical-records/{patientId}/{year}/{filename}`
- Frontend (Patient App):
  - Medical Records page with tabs: All, Lab Reports, Scans, Prescriptions, Other
  - Upload area (react-dropzone): drag-and-drop with file type icons
  - Record cards: thumbnail (for images), title, date, type badge, download/delete actions
  - File preview modal (images in lightbox, PDFs in iframe)

#### Acceptance Criteria

- [ ] Files upload to Cloudinary successfully
- [ ] File type validation rejects invalid types
- [ ] File size limit enforced (10MB)
- [ ] Records filterable by type
- [ ] Download works for all file types
- [ ] Delete removes record (soft delete)
- [ ] Upload area supports drag-and-drop
- [ ] Preview modal works for images and PDFs

#### Test Criteria

- Upload valid file → record created with Cloudinary URL
- Upload invalid type → 400
- Upload oversized file → 400
- List records → returns only patient's records
- Delete record → soft deleted
- Download → returns file

#### Dependencies

- M5-6 (Cloudinary config)

---

### Issue M12-2: Digital Prescriptions (e-Prescriptions)

**Labels**: `milestone:M12` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Build the digital prescription system. Doctors create prescriptions after consultations containing medicines, dosage, instructions, and notes. Prescriptions are saved and also generated as downloadable PDFs.

#### Requirements

- Create `Prescription.model.ts`: appointmentId, doctorId, patientId, medicines (array of {name, dosage, frequency, duration, instructions}), diagnosis, notes, pdfUrl, createdAt
- Backend routes (doctor/admin):
  - `POST /api/v1/prescriptions` — create prescription
  - `GET /api/v1/prescriptions/:appointmentId` — get prescription for appointment
- Backend route (patient):
  - `GET /api/v1/prescriptions` — list all my prescriptions
  - `GET /api/v1/prescriptions/:id/download` — download PDF
- Auto-generate PDF using pdfkit:
  - Header: hospital name/logo, doctor name, specialization
  - Patient info: name, age, gender
  - Date and appointment reference
  - Medicines table: medicine name, dosage, frequency, duration
  - Diagnosis and doctor notes
  - Doctor signature placeholder
- Upload PDF to Cloudinary, store URL
- Frontend (Admin App):
  - Prescription creation form (post-consultation)
  - Add medicines dynamically (add/remove rows)
  - Preview before saving
- Frontend (Patient App):
  - View prescription in appointment detail
  - Download prescription PDF

#### Acceptance Criteria

- [ ] Doctor can create prescription with multiple medicines
- [ ] Prescription PDF generated with professional layout
- [ ] Patient can view and download prescription
- [ ] Prescription linked to specific appointment
- [ ] Medicine list supports add/remove dynamically
- [ ] PDF contains all required information

#### Test Criteria

- Create prescription → saved in DB + PDF generated
- Get prescription by appointment → returns correct prescription
- Download PDF → returns valid PDF file
- Patient can only view their own prescriptions

#### Dependencies

- M8-4 (PDF generation), M7-1

---

### Issue M12-3: Health Timeline View

**Labels**: `milestone:M12` `type:frontend` `priority:medium`
**Estimate**: 1 day

#### Context

Build a visual timeline showing all medical events for a patient — appointments, prescriptions, record uploads — in chronological order.

#### Requirements

- Frontend (Patient App):
  - Timeline page showing events chronologically (most recent first)
  - Event types with distinct icons and colors:
    - Appointment (blue): doctor name, date, status
    - Prescription (green): doctor name, medicine count
    - Record Upload (purple): file type, title
    - Payment (orange): amount, status
  - Click event → navigate to detail page
  - Date grouping (Today, This Week, This Month, Earlier)
  - Filter by event type
- Aggregate data from multiple API endpoints (appointments, prescriptions, records)
- Responsive timeline layout (vertical on mobile)

#### Acceptance Criteria

- [ ] Timeline shows all event types in chronological order
- [ ] Events grouped by date range
- [ ] Event icons and colors distinguish types
- [ ] Click event navigates to detail
- [ ] Filter by event type works
- [ ] Responsive layout

#### Test Criteria

- Component test: renders events from mock data
- Component test: date grouping works correctly
- Component test: filter hides/shows event types

#### Dependencies

- M12-1, M12-2, M7-4

---

### Issue M12-4: Admin — Medical Records Access

**Labels**: `milestone:M12` `type:feature` `priority:medium`
**Estimate**: 1 day

#### Context

Allow doctors and admins to view patient medical records during consultations. Doctors can also upload records on behalf of patients.

#### Requirements

- Backend:
  - Admin/doctor can access patient records: `GET /api/v1/admin/patients/:id/records`
  - Doctor can upload records for patient: `POST /api/v1/admin/patients/:id/records`
  - Audit log for record access (who viewed what, when)
- Frontend (Admin App):
  - Patient detail page: add "Medical Records" tab
  - View patient's uploaded records
  - Upload records on behalf of patient
  - Access log visible to superAdmin

#### Acceptance Criteria

- [ ] Doctor can view patient's records during consultation
- [ ] Doctor can upload records for patient
- [ ] Access logged in audit trail
- [ ] Records tab visible in patient detail page

#### Test Criteria

- Doctor accesses patient records → access logged
- Upload record for patient → saved with uploadedBy: doctor
- SuperAdmin can view access logs

#### Dependencies

- M12-1, M9-5

---

---

## M13 — Admin Advanced

> **Goal**: Financial management, GST reports, hospital settings, audit logs, team management, and advanced reporting.

---

### Issue M13-1: Admin — Financial Dashboard & Revenue Reports

**Labels**: `milestone:M13` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Build the financial management section with revenue analytics, payment tracking, and exportable reports.

#### Requirements

- Backend:
  - `GET /api/v1/admin/revenue` — revenue data with filters (date range, doctor, department, payment method)
  - `GET /api/v1/admin/payments` — all payments with search/filter/pagination
  - `GET /api/v1/admin/revenue/export` — export as CSV/Excel
- Frontend (Admin App) — Finance page:
  - Revenue KPI cards: total revenue, today's revenue, pending settlements, total refunds
  - Revenue chart: line/bar chart with daily/weekly/monthly toggle
  - Revenue breakdown: by doctor (table), by department (pie chart), by payment method (donut chart)
  - Payments table: searchable, filterable, with status badges
  - Export button (CSV download)
  - Date range selector

#### Acceptance Criteria

- [ ] Revenue KPIs calculate correctly
- [ ] Charts render with real data
- [ ] Filters work (doctor, department, date range)
- [ ] Payments table searchable and filterable
- [ ] CSV export downloads correctly
- [ ] Revenue breakdown matches total

#### Test Criteria

- Revenue API returns correct aggregations
- CSV export contains expected columns and data
- Date range filter returns correct subset

#### Dependencies

- M9-2, M8-2

---

### Issue M13-2: Admin — GST & Tax Reports

**Labels**: `milestone:M13` `type:feature` `priority:medium`
**Estimate**: 1 day

#### Context

Generate GST-compliant tax reports for the hospital's accounting needs.

#### Requirements

- Backend:
  - `GET /api/v1/admin/reports/gst` — GST report for date range
  - Calculate: taxable amount, CGST, SGST, IGST, total tax, total with tax
  - Group by month for quarterly filing
- Configure hospital GST settings:
  - GSTIN number
  - HSN/SAC code for medical services
  - Tax rates (currently 18% for healthcare services, but some exempt)
- Frontend (Admin App):
  - GST Report page: select date range → view report → export
  - Monthly breakdown table
  - Summary row with totals
  - Export as CSV/PDF

#### Acceptance Criteria

- [ ] GST report calculates tax correctly
- [ ] Monthly breakdown for quarterly filing
- [ ] GSTIN and HSN codes included in report
- [ ] Export as CSV and PDF

#### Test Criteria

- GST calculation matches manual calculation
- Export contains all required tax fields
- Date range filter works correctly

#### Dependencies

- M13-1

---

### Issue M13-3: Admin — Hospital Settings & Booking Policy

**Labels**: `milestone:M13` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Build the hospital settings page where admins configure hospital profile, working hours, holidays, and booking policies.

#### Requirements

- Backend:
  - `GET /api/v1/admin/settings` — get hospital settings
  - `PUT /api/v1/admin/settings/profile` — update hospital profile
  - `PUT /api/v1/admin/settings/working-hours` — update working hours
  - `PUT /api/v1/admin/settings/holidays` — manage holiday calendar
  - `PUT /api/v1/admin/settings/booking-policy` — update booking policy
- Frontend (Admin App) — Settings page with tabs:
  - Hospital Profile: name, logo upload, description, contact, address
  - Working Hours: day-wise open/close time picker
  - Holiday Calendar: add/remove holidays with date picker
  - Booking Policy: cancellation window (hours), rescheduling allowed (yes/no), refund percentages (configurable tiers)
  - Branch Management: add/edit/remove branches with addresses
- Only superAdmin and admin can access settings

#### Acceptance Criteria

- [ ] Hospital profile editable with logo upload
- [ ] Working hours configurable per day
- [ ] Holidays can be added and removed
- [ ] Booking policy changes reflect in booking/cancellation logic
- [ ] Branch management works (add/edit/remove)
- [ ] Only admin/superAdmin can access

#### Test Criteria

- Update profile → changes saved and reflected
- Add holiday → no slots generated for that date
- Change cancellation window → refund logic uses new value
- Receptionist cannot access settings → 403

#### Dependencies

- M9-1

---

### Issue M13-4: Admin — Audit Logs

**Labels**: `milestone:M13` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Implement comprehensive audit logging for all administrative actions for compliance and security monitoring.

#### Requirements

- Create audit log middleware:
  - Log all write operations (POST, PUT, PATCH, DELETE) on admin routes
  - Record: userId, action, resource, resourceId, changes (before/after), IP address, userAgent, timestamp
- Store audit logs in separate MongoDB collection (append-only, no updates/deletes)
- Backend:
  - `GET /api/v1/admin/audit-logs` — list logs with filters (user, action, resource, date range)
  - SuperAdmin only
- Frontend (Admin App):
  - Audit Logs page: searchable/filterable table
  - Columns: timestamp, user, action, resource, details
  - Click row → expanded view showing before/after changes
  - Date range filter, user filter, action type filter
  - Export as CSV

#### Acceptance Criteria

- [ ] All admin write operations automatically logged
- [ ] Audit logs immutable (no edit/delete API)
- [ ] Filterable by user, action, resource, date
- [ ] Before/after changes recorded for updates
- [ ] Only superAdmin can view audit logs
- [ ] Export as CSV works

#### Test Criteria

- Create doctor → audit log entry created
- Update appointment status → log with before/after
- Delete request on audit log → 405 Method Not Allowed
- Non-superAdmin accessing logs → 403

#### Dependencies

- M9-1

---

### Issue M13-5: Admin — Team Invitation & Management

**Labels**: `milestone:M13` `type:feature` `priority:high`
**Estimate**: 1 day

#### Context

Allow admins to invite team members (receptionists, lab technicians, other admins) via email with pre-assigned roles.

#### Requirements

- Backend:
  - `POST /api/v1/admin/invite` — send invite email with role
  - Generate invite token (24h expiry)
  - `POST /api/v1/auth/accept-invite` — accept invite, set password, activate account
  - `GET /api/v1/admin/team` — list all team members
  - `PATCH /api/v1/admin/team/:id/role` — change member's role
  - `DELETE /api/v1/admin/team/:id` — deactivate member
- Frontend (Admin App):
  - Team Management page: list of all staff with name, email, role, status
  - "Invite Member" modal: email + role selector
  - Role change dropdown per member
  - Deactivate member with confirmation
- Invite email template with accept link

#### Acceptance Criteria

- [ ] Invite email sent with unique link
- [ ] Accept invite creates account with assigned role
- [ ] Expired invite token returns error
- [ ] Team list shows all members with roles
- [ ] Role change updates permissions immediately
- [ ] Deactivate prevents login

#### Test Criteria

- Send invite → token created, email sent
- Accept invite → user created with correct role
- Expired token → 400
- Role change → updated in DB

#### Dependencies

- M10-1, M5-5

---

### Issue M13-6: Admin — Operational Reports & Export

**Labels**: `milestone:M13` `type:feature` `priority:medium`
**Estimate**: 2 days

#### Context

Build the reports section with pre-built report templates and export functionality.

#### Requirements

- Backend:
  - `GET /api/v1/admin/reports/appointments` — appointment summary report
  - `GET /api/v1/admin/reports/doctors` — doctor performance report
  - `GET /api/v1/admin/reports/patients` — patient growth report
  - `GET /api/v1/admin/reports/revenue` — revenue summary report
  - All reports support date range filter and export (CSV, PDF)
- Frontend (Admin App):
  - Reports page: report type selector cards
  - Each report: date range picker → chart visualization → data table → export buttons
  - Report types:
    - Appointment Report: total, by status, by department, by doctor, daily trend
    - Doctor Performance: appointments handled, ratings, revenue per doctor
    - Patient Report: new registrations, returning vs. new, demographics
    - Revenue Report: daily/monthly trends, by payment method
  - Charts: Recharts (bar, line, pie as appropriate)
  - Export: CSV and PDF buttons

#### Acceptance Criteria

- [ ] All 4 report types generate correctly
- [ ] Date range filter works for all reports
- [ ] Charts render with real data
- [ ] CSV export contains correct data
- [ ] PDF export generates downloadable report
- [ ] Reports load within 3 seconds

#### Test Criteria

- Appointment report API returns correct aggregations
- Doctor performance metrics calculated correctly
- CSV export contains expected columns
- Date range filter returns correct subset

#### Dependencies

- M9-2, M13-1

---

---

## M14 — Reviews & Polish

> **Goal**: Reviews system, i18n, dark mode, help section, animations, and accessibility pass.

---

### Issue M14-1: Reviews & Ratings System

**Labels**: `milestone:M14` `type:feature` `priority:high`
**Estimate**: 2 days

#### Context

Build the doctor review and rating system. Patients can rate and review doctors after completed appointments.

#### Requirements

- Create `Review.model.ts`: doctorId, patientId, appointmentId (unique — one review per appointment), rating (1-5), comment, isReported, createdAt
- Backend:
  - `POST /api/v1/reviews` — create review (only after completed appointment, one per appointment)
  - `GET /api/v1/doctors/:id/reviews` — paginated reviews for doctor
  - `POST /api/v1/reviews/:id/report` — flag inappropriate review
  - Update doctor's average rating and totalReviews on new review (aggregation)
- Frontend (Patient App):
  - Rate Doctor modal (appears after appointment completion): star rating + text review
  - Doctor profile: reviews section with rating distribution bar, average rating, individual reviews
  - Report button on reviews
- Frontend (Admin App):
  - Reported reviews moderation page: approve/remove flagged reviews

#### Acceptance Criteria

- [ ] One review per appointment enforced
- [ ] Only completed appointments can be reviewed
- [ ] Star rating (1-5) with text comment
- [ ] Doctor's average rating updated on new review
- [ ] Reviews paginated on doctor profile
- [ ] Rating distribution bar chart (5-star, 4-star, etc.)
- [ ] Flagged reviews visible to admin for moderation

#### Test Criteria

- Create review → doctor rating recalculated
- Duplicate review for same appointment → 409
- Review for non-completed appointment → 400
- Get reviews → paginated with correct average
- Report review → isReported flag set

#### Dependencies

- M7-6, M6-5

---

### Issue M14-2: Multi-Language Support (i18n)

**Labels**: `milestone:M14` `type:feature` `priority:medium`
**Estimate**: 2 days

#### Context

Implement internationalization in both frontend apps using i18next. Support English and Hindi initially, with architecture for adding more languages.

#### Requirements

- Install `i18next`, `react-i18next` in both apps
- Create translation files:
  ```
  src/i18n/
  ├── en/
  │   ├── common.json    (buttons, labels, navigation)
  │   ├── auth.json      (login, register, password)
  │   ├── booking.json   (appointments, slots, booking)
  │   └── errors.json    (error messages)
  └── hi/
      ├── common.json
      ├── auth.json
      ├── booking.json
      └── errors.json
  ```
- Replace all hardcoded strings with `t('key')` calls
- Language selector in header/settings (dropdown)
- Persist selected language in localStorage
- Detect browser language on first visit
- RTL support architecture (for future Urdu/Arabic if needed)
- Date/time formatting respects locale (dayjs locale)

#### Acceptance Criteria

- [ ] All UI strings use i18n keys (no hardcoded text)
- [ ] Language switcher toggles between English and Hindi
- [ ] Selected language persists across sessions
- [ ] Browser language detected on first visit
- [ ] Date formatting respects locale
- [ ] Adding new language requires only creating JSON files

#### Test Criteria

- Switch to Hindi → all visible text changes
- Refresh page → language persists
- Missing translation → falls back to English
- Date format changes with locale

#### Dependencies

- M7-4, M9-1

---

### Issue M14-3: Dark Mode / Light Mode Toggle

**Labels**: `milestone:M14` `type:feature` `priority:medium`
**Estimate**: 1 day

#### Context

Implement dark/light mode toggle with system preference detection and smooth theme transitions.

#### Requirements

- CSS: Define dark mode design tokens as CSS custom properties
  ```css
  :root { --bg-primary: #ffffff; --text-primary: #1a1a1a; ... }
  [data-theme="dark"] { --bg-primary: #0f0f0f; --text-primary: #f0f0f0; ... }
  ```
- Theme toggle button in header (sun/moon icon with animation)
- Detect system preference via `prefers-color-scheme` media query
- Persist selection in localStorage (override system preference)
- Smooth transition between themes (CSS transition on background/color)
- Apply to both patient and admin apps
- All components must respect theme variables

#### Acceptance Criteria

- [ ] Toggle switches between dark and light themes
- [ ] System preference detected on first visit
- [ ] Selection persists across sessions
- [ ] Smooth transition animation between themes
- [ ] All components render correctly in both themes
- [ ] Charts (Recharts) adapt to dark mode

#### Test Criteria

- Toggle theme → CSS variables change
- Refresh → theme persists
- System dark mode → app starts in dark
- All pages render without visual glitches in dark mode

#### Dependencies

- M0-3, M0-4

---

### Issue M14-4: Help & Support Section

**Labels**: `milestone:M14` `type:feature` `priority:low`
**Estimate**: 1 day

#### Context

Build the help and support section with FAQ, contact form, and emergency information.

#### Requirements

- Frontend (Patient App):
  - Help page with sections:
    - FAQ: accordion with common questions and answers
    - Contact Us: support email, phone, working hours
    - Contact Form: name, email, subject, message (sends email to support)
    - Emergency: ambulance number, emergency contacts
  - "Help" link in footer and sidebar
- Backend:
  - `POST /api/v1/support/contact` — send contact form email to support
- FAQ content managed as static JSON (easily updatable)

#### Acceptance Criteria

- [ ] FAQ accordion works with expand/collapse
- [ ] Contact form sends email to support
- [ ] Emergency numbers displayed prominently
- [ ] Help page accessible from footer
- [ ] Form validation on contact form

#### Test Criteria

- FAQ accordion expands/collapses
- Contact form submission → email sent
- Invalid form → validation errors shown

#### Dependencies

- M10-1

---

### Issue M14-5: UI Animations & Accessibility Pass

**Labels**: `milestone:M14` `type:enhancement` `priority:medium`
**Estimate**: 2 days

#### Context

Add Framer Motion animations for page transitions, micro-interactions, and hover effects. Perform an accessibility audit and fix issues.

#### Requirements

- Framer Motion animations:
  - Page transitions (fade + slide)
  - Card hover effects (lift + shadow)
  - Button press feedback (scale)
  - Modal open/close (scale + fade)
  - List item stagger animation
  - Loading skeleton shimmer
  - Notification slide-in
- Accessibility:
  - All interactive elements have keyboard focus styles
  - Tab order is logical on all pages
  - Images have alt text
  - Color contrast meets WCAG 2.1 AA (4.5:1 for text)
  - Form inputs have associated labels
  - Error messages announced to screen readers (aria-live)
  - Skip-to-content link on all pages
  - Focus trap in modals
- Test with keyboard-only navigation
- Test with screen reader (VoiceOver/NVDA basic check)

#### Acceptance Criteria

- [ ] Page transitions are smooth (no janky flashes)
- [ ] Card hover effects feel premium
- [ ] Modal animations work (open/close)
- [ ] All pages navigable via keyboard
- [ ] Color contrast passes WCAG AA
- [ ] Form inputs have labels
- [ ] Skip-to-content link present
- [ ] Focus trapped in modals

#### Test Criteria

- Keyboard navigation: tab through all pages without getting stuck
- Color contrast: check primary text and buttons
- Screen reader: major pages announce correctly
- Animations: no layout shift during transitions

#### Dependencies

- All frontend pages complete

---

---

## M15 — Production Release

> **Goal**: Performance optimization, production Docker setup, production CI/CD, and go-live checklist.

---

### Issue M15-1: Performance Audit & Optimization

**Labels**: `milestone:M15` `type:enhancement` `priority:critical`
**Estimate**: 2 days

#### Context

Run performance audits on both frontend apps, optimize bundle sizes, implement code splitting, and ensure fast load times.

#### Requirements

- Frontend optimization:
  - Vite bundle analysis (visualize chunk sizes)
  - Code splitting: lazy load routes with `React.lazy` + `Suspense`
  - Tree-shaking verification (no unused imports)
  - Image optimization (Cloudinary transformations, lazy loading)
  - Font loading: `font-display: swap`
  - Preload critical assets
  - Service worker for caching (optional)
- Backend optimization:
  - Database query optimization: ensure all queries use indexes
  - Add MongoDB explain() analysis for slow queries
  - Redis caching for frequently accessed data (doctor list, specialties)
  - Response compression (gzip via Nginx — already configured)
  - API response time logging
- Run Lighthouse audit: target scores:
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 90+

#### Acceptance Criteria

- [ ] Lighthouse Performance score ≥ 90
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Bundle size < 300KB (initial load, gzipped)
- [ ] Route-based code splitting implemented
- [ ] All DB queries use indexes (no collection scans)
- [ ] Redis caching reduces DB load for hot paths
- [ ] Images lazy-loaded below the fold

#### Test Criteria

- Lighthouse audit passes all thresholds
- Bundle analysis shows no oversized chunks
- Page load < 2s on throttled 4G
- API response times < 200ms (cached paths)

#### Dependencies

- All features complete

---

### Issue M15-2: Production Docker & Environment Configuration

**Labels**: `milestone:M15` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Finalize the production Docker setup with proper environment configuration, secrets management, and production-specific optimizations.

#### Requirements

- Review and harden production Dockerfile:
  - Non-root user in container
  - Health check command in Dockerfile
  - Minimal base image (node:24-alpine)
  - Security scanning (docker scout)
- Create production environment variables template:
  - All API keys (Razorpay, Daily.co, Cloudinary, Firebase, SMTP)
  - MongoDB Atlas connection string (if using Atlas)
  - Redis connection string
  - JWT secrets (strong, unique)
  - CORS allowed origins (production domains)
  - Rate limit configuration
- Create `docker-compose.production.yml`:
  - App container with resource limits
  - MongoDB with authentication enabled
  - Redis with password
  - Nginx container (or use VPS Nginx)
  - Automatic restart policy (unless-stopped)
- Security checklist:
  - No secrets in Docker image
  - .env not committed to Git
  - MongoDB authentication enabled
  - Redis password set

#### Acceptance Criteria

- [ ] Production Docker runs as non-root user
- [ ] Health check configured in Dockerfile
- [ ] All secrets via environment variables (not baked into image)
- [ ] MongoDB has authentication enabled
- [ ] Redis has password protection
- [ ] Container restarts automatically on crash
- [ ] Resource limits set (CPU, memory)

#### Test Criteria

- Build production image → no security warnings
- Run production stack → all services healthy
- Health check endpoint responds correctly
- No secrets visible in `docker inspect`

#### Dependencies

- M3-1, M4-1

---

### Issue M15-3: Production CI/CD Pipeline

**Labels**: `milestone:M15` `type:devops` `priority:critical`
**Estimate**: 1 day

#### Context

Create the production deployment pipeline that deploys to the production CloudClusters instance when code is merged to `main`.

#### Requirements

- Create/update `.github/workflows/deploy.yml`:
  - Trigger: push to `main` branch only
  - Jobs: build → push → deploy-production
  - Deploy-production:
    - SSH into production VPS
    - Pull latest image from registry
    - Run database migration script (if any)
    - Rolling update: start new container → health check → stop old container
    - Rollback: if health check fails, restart previous image
  - Slack/Discord notification on deploy success/failure (optional)
- Create rollback procedure documentation
- Create deployment runbook in `docs/deployment-runbook.md`:
  - Pre-deployment checklist
  - Deployment steps
  - Post-deployment verification
  - Rollback procedure
  - Emergency contacts

#### Acceptance Criteria

- [ ] Merge to `main` triggers production deployment
- [ ] Rolling update with zero downtime
- [ ] Health check verification after deploy
- [ ] Auto-rollback on failed health check
- [ ] Deployment runbook documented
- [ ] Rollback procedure tested

#### Test Criteria

- Merge to `main` → image built and deployed to production
- Failed health check → automatic rollback
- Deployment notification sent

#### Dependencies

- M3-3, M4-3

---

### Issue M15-4: Go-Live Checklist & Smoke Tests

**Labels**: `milestone:M15` `type:qa` `priority:critical`
**Estimate**: 1 day

#### Context

Final pre-launch checklist covering all aspects of the production deployment. Run comprehensive smoke tests on production.

#### Requirements

- Pre-launch checklist:
  - [ ] All environment variables configured on production
  - [ ] SSL certificate valid and auto-renewing
  - [ ] MongoDB backups configured and tested (restore test)
  - [ ] Domain DNS propagated fully
  - [ ] Razorpay switched from test to live mode
  - [ ] Daily.co production plan active
  - [ ] Cloudinary production account configured
  - [ ] Firebase production project configured
  - [ ] SMTP production credentials set
  - [ ] Rate limiting configured for production load
  - [ ] Error monitoring configured (Sentry or similar — optional)
  - [ ] Analytics configured (Google Analytics — optional)
- Production smoke tests:
  - [ ] Register new patient account
  - [ ] Login with credentials
  - [ ] Search for a doctor
  - [ ] View doctor profile and slots
  - [ ] Book appointment and complete payment (live Razorpay)
  - [ ] Receive confirmation email
  - [ ] View appointment in "My Appointments"
  - [ ] Admin login works
  - [ ] Admin dashboard loads with data
  - [ ] Cancel appointment and verify refund initiated
- Document known issues and limitations for v1.0
- Create user-facing release notes

#### Acceptance Criteria

- [ ] All checklist items verified
- [ ] All smoke tests pass on production
- [ ] Backup restore tested successfully
- [ ] Known issues documented
- [ ] Release notes created
- [ ] Team trained on monitoring and support procedures

#### Test Criteria

- Full booking flow works end-to-end on production
- Payment processes successfully (live Razorpay)
- Email notifications received
- Admin dashboard shows real data
- No console errors in production

#### Dependencies

- All previous milestones complete

---

---

## Summary

| Milestone                     | Issues |   Est. Days   |  Cumulative   |
| :---------------------------- | :----: | :-----------: | :-----------: |
| M0 — Project Scaffolding      |   6    |       7       |    Week 1     |
| M1 — Test Suite Foundation    |   4    |       4       |    Week 2     |
| M2 — CI Pipeline              |   3    |       4       |   Week 2-3    |
| M3 — Docker & CD              |   4    |       4       |    Week 3     |
| M4 — CloudClusters & Domain   |   3    |       4       |    Week 4     |
| M5 — Auth & User System       |   6    |       9       |   Week 5-6    |
| M6 — Doctor & Search          |   5    |       9       |   Week 6-7    |
| M7 — Appointment Booking      |   6    |      10       |   Week 8-9    |
| M8 — Payments (Razorpay)      |   5    |       7       |   Week 9-10   |
| M9 — Admin Dashboard          |   6    |      10       |  Week 10-11   |
| M10 — Notifications           |   5    |       8       |    Week 12    |
| M11 — Telemedicine            |   4    |       5       |    Week 13    |
| M12 — Records & Prescriptions |   4    |       6       |  Week 13-14   |
| M13 — Admin Advanced          |   6    |       9       |  Week 14-15   |
| M14 — Reviews & Polish        |   5    |       8       |    Week 16    |
| M15 — Production Release      |   4    |       5       |    Week 17    |
| **TOTAL**                     | **76** | **~109 days** | **~17 weeks** |

> **Note**: Estimated days assume a single developer. With a team of 2-3 developers working in parallel (frontend + backend), timeline can be compressed to ~10-12 weeks.
