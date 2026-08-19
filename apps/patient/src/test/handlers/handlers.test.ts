import { describe, expect, it } from 'vitest';

import { apiBaseUrl } from './http.js';

describe('patient MSW handlers', () => {
  it('mocks auth register with ApiResponse shape', async () => {
    const response = await fetch(`${apiBaseUrl()}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Asha Menon',
        email: 'asha.menon@example.com',
        phone: '9876543210',
        password: 'Str0ngPass',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toMatchObject({
      success: true,
      statusCode: 201,
      message: expect.any(String),
      data: {
        user: expect.objectContaining({ email: 'asha.menon@example.com' }),
        accessToken: expect.any(String),
      },
    });
  });

  it('mocks auth me with 401 when token is missing', async () => {
    const response = await fetch(`${apiBaseUrl()}/auth/me`);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({
      success: false,
      statusCode: 401,
      message: 'Unauthorized',
    });
  });

  it('mocks doctor list with pagination envelope', async () => {
    const response = await fetch(`${apiBaseUrl()}/doctors`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      statusCode: 200,
      message: expect.any(String),
      data: expect.any(Array),
      pagination: {
        page: 1,
        limit: 10,
        total: expect.any(Number),
        totalPages: expect.any(Number),
      },
    });
  });

  it('mocks doctor detail with 404 for unknown id', async () => {
    const response = await fetch(`${apiBaseUrl()}/doctors/000000000000000000000000`);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toMatchObject({
      success: false,
      statusCode: 404,
      message: 'Doctor not found',
    });
  });
});
