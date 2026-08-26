import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from 'dotenv';

const currentDir = fileURLToPath(new URL('.', import.meta.url));
const serverRoot = resolve(currentDir, '../..');
const repoRoot = resolve(serverRoot, '../..');

config({ path: resolve(repoRoot, '.env') });
config({ path: resolve(serverRoot, '.env'), override: true });

const DEFAULT_CORS_ORIGINS = ['http://localhost:5173', 'http://localhost:5174'];

function requireEnv(key: string): string {
  const value = process.env[key];

  if (value === undefined || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value.trim();
}

function parsePort(value: string | undefined): number {
  const port = Number.parseInt(value ?? '5000', 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT value: ${value ?? 'undefined'}`);
  }

  return port;
}

function parseCorsOrigins(value: string | undefined): string[] {
  if (value === undefined || value.trim() === '') {
    return DEFAULT_CORS_ORIGINS;
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

const nodeEnv = process.env.NODE_ENV ?? 'development';

export const env = {
  nodeEnv,
  port: parsePort(process.env.PORT),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGINS),
  mongodbUri: requireEnv('MONGODB_URI'),
  redisUrl: requireEnv('REDIS_URL'),
  isProduction: nodeEnv === 'production',
} as const;
