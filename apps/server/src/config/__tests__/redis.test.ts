import { describe, expect, it } from 'vitest';

import { connectRedis, disconnectRedis, getRedisStatus } from '../redis.js';

describe('redis config', () => {
  it('reports disconnected before an explicit connection', () => {
    expect(getRedisStatus()).toBe('disconnected');
  });

  it('connects and disconnects cleanly when redis is reachable', async () => {
    if (process.env.CI !== 'true') {
      await expect(connectRedis()).rejects.toThrow();
      expect(getRedisStatus()).toBe('disconnected');
      return;
    }

    await expect(connectRedis()).resolves.toBeUndefined();
    expect(getRedisStatus()).toBe('connected');

    await disconnectRedis();
    expect(getRedisStatus()).toBe('disconnected');

    await expect(disconnectRedis()).resolves.toBeUndefined();
  });
});
