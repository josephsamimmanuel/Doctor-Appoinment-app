import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@test/factories': fileURLToPath(new URL('./src/test/factories/index.ts', import.meta.url)),
      '@test/helpers': fileURLToPath(new URL('./src/test/helpers.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts'],
    testTimeout: 60_000,
    hookTimeout: 120_000,
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        statements: 70,
        branches: 65,
      },
      exclude: ['src/test/**', 'src/**/*.test.ts', 'src/server.ts'],
    },
  },
});
