import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
// CI (pnpm/setup) has `pnpm` on PATH; locally use corepack when pnpm is not shimmed.
const pnpm = isCI ? 'pnpm' : 'corepack pnpm';

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  retries: isCI ? 2 : 0,
  forbidOnly: isCI,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 15'] },
    },
  ],
  webServer: [
    {
      name: 'Patient',
      command: `${pnpm} --filter patient dev`,
      url: 'http://localhost:5173',
      cwd: '..',
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
    {
      name: 'Admin',
      command: `${pnpm} --filter admin dev`,
      url: 'http://localhost:5174',
      cwd: '..',
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
  ],
});
