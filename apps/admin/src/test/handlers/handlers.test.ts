import { describe, expect, it } from 'vitest';

import { apiBaseUrl } from './http.js';

describe('admin MSW handlers', () => {
  it('mocks admin login with ApiResponse shape', async () => {
    const response = await fetch(`${apiBaseUrl()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@hospital.example.com',
        password: 'Str0ngPass',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      statusCode: 200,
      message: expect.any(String),
      data: {
        user: expect.objectContaining({ role: 'admin' }),
        accessToken: expect.any(String),
      },
    });
  });

  it('mocks admin dashboard analytics', async () => {
    const response = await fetch(`${apiBaseUrl()}/admin/dashboard`, {
      headers: { Authorization: 'Bearer mock-admin-access-token' },
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      statusCode: 200,
      message: expect.any(String),
      data: expect.objectContaining({
        totalAppointments: expect.any(Number),
        totalDoctors: expect.any(Number),
        totalPatients: expect.any(Number),
      }),
    });
  });

  it('mocks admin appointments with pagination envelope', async () => {
    const response = await fetch(`${apiBaseUrl()}/admin/appointments`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      statusCode: 200,
      data: expect.any(Array),
      pagination: expect.objectContaining({
        page: 1,
        totalPages: expect.any(Number),
      }),
    });
  });

  it('mocks admin patients directory', async () => {
    const response = await fetch(`${apiBaseUrl()}/admin/patients`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      statusCode: 200,
      data: expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
        }),
      ]),
    });
  });
});
