import { UserRole } from '@repo/shared/constants';
import type { IUser } from '@repo/shared/types';
import { http } from 'msw';

import { apiBaseUrl, errorResponse, extractBearerToken, successResponse } from './http.js';

const mockAdminUser: IUser = {
  _id: '507f1f77bcf86cd799439021',
  name: 'Dr. Admin User',
  email: 'admin@hospital.example.com',
  phone: '9123456780',
  role: UserRole.Admin,
  isEmailVerified: true,
  isPhoneVerified: true,
  createdAt: '2026-08-19T08:00:00.000Z',
  updatedAt: '2026-08-19T08:00:00.000Z',
};

const mockAccessToken = 'mock-admin-access-token';

export const authHandlers = [
  http.post(`${apiBaseUrl()}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (body.email === 'invalid@example.com') {
      return errorResponse(401, 'Invalid email or password');
    }

    return successResponse(200, 'Login successful', {
      user: mockAdminUser,
      accessToken: mockAccessToken,
    });
  }),

  http.get(`${apiBaseUrl()}/auth/me`, ({ request }) => {
    const token = extractBearerToken(request);

    if (token === null || token === 'invalid-token') {
      return errorResponse(401, 'Unauthorized');
    }

    return successResponse(200, 'User profile fetched successfully', mockAdminUser);
  }),
];
