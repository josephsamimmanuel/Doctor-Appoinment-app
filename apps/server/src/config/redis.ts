import { Redis } from 'ioredis';

import { env } from './env.js';

export type ConnectionStatus = 'connected' | 'disconnected';

const QUIT_TIMEOUT_MS = 5000;

let listenersRegistered = false;

export const redis = new Redis(env.redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

function registerConnectionListeners(): void {
  if (listenersRegistered) {
    return;
  }

  listenersRegistered = true;

  redis.on('connect', () => {
    console.log('Redis connecting...');
  });

  redis.on('ready', () => {
    console.log('Redis connected');
  });

  redis.on('error', (error: Error) => {
    console.error('Redis connection error:', error.message);
  });

  redis.on('close', () => {
    console.log('Redis connection closed');
  });
}

export async function connectRedis(): Promise<void> {
  registerConnectionListeners();

  if (redis.status === 'ready') {
    return;
  }

  try {
    await redis.connect();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Redis is unreachable: ${message}`);
    throw error;
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis.status === 'end' || redis.status === 'close') {
    return;
  }

  try {
    await Promise.race([
      redis.quit(),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Redis quit timed out')), QUIT_TIMEOUT_MS);
      }),
    ]);
  } catch {
    redis.disconnect();
  }
}

export function getRedisStatus(): ConnectionStatus {
  return redis.status === 'ready' ? 'connected' : 'disconnected';
}
