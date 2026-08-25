import { describe, expect, it } from 'vitest';

import { createRequest } from '@test/helpers';

describe('GET /api/v1/health', () => {
  it('returns 200 with the expected ApiResponse structure', async () => {
    const response = await createRequest().get('/api/v1/health').expect(200);

    expect(response.body).toEqual({
      success: true,
      statusCode: 200,
      message: 'Server is healthy',
      data: {
        status: 'ok',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        db: 'connected',
        redis: 'disconnected',
      },
    });

    expect(Number.isNaN(Date.parse(response.body.data.timestamp))).toBe(false);
    expect(response.body.data.uptime).toBeGreaterThanOrEqual(0);
  });

  it('returns 404 for unknown routes', async () => {
    const response = await createRequest().get('/api/v1/unknown-route').expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        statusCode: 404,
        message: 'Route not found: GET /api/v1/unknown-route',
      }),
    );
  });
});
