import { UserRole } from '@repo/shared/constants';
import type { IUser } from '@repo/shared/types';
import { http } from 'msw';

import { apiBaseUrl, errorResponse, extractBearerToken, successResponse } from './http.js';

const mockPatientUser: IUser = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Asha Menon',
  email: 'asha.menon@example.com',
  phone: '9876543210',
  role: UserRole.Patient,
  isEmailVerified: true,
  isPhoneVerified: true,
  createdAt: '2026-08-19T08:00:00.000Z',
  updatedAt: '2026-08-19T08:00:00.000Z',
};

const mockAccessToken = 'mock-access-token';

export const authHandlers = [
  http.post(`${apiBaseUrl()}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
    };

    const user: IUser = {
      ...mockPatientUser,
      name: body.name ?? mockPatientUser.name,
      email: body.email?.toLowerCase() ?? mockPatientUser.email,
      phone: body.phone ?? mockPatientUser.phone,
      isEmailVerified: false,
      isPhoneVerified: false,
    };

    return successResponse(201, 'User registered successfully', {
      user,
      accessToken: mockAccessToken,
    });
  }),

  http.post(`${apiBaseUrl()}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (body.email === 'invalid@example.com') {
      return errorResponse(401, 'Invalid email or password');
    }

    return successResponse(200, 'Login successful', {
      user: mockPatientUser,
      accessToken: mockAccessToken,
    });
  }),

  http.get(`${apiBaseUrl()}/auth/me`, ({ request }) => {
    const token = extractBearerToken(request);

    if (token === null || token === 'invalid-token') {
      return errorResponse(401, 'Unauthorized');
    }

    return successResponse(200, 'User profile fetched successfully', mockPatientUser);
  }),
];
