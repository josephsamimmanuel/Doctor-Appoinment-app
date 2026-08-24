import { http } from 'msw';

import { SPECIALTIES } from '@repo/shared/constants';
import type { IDoctor } from '@repo/shared/types';

import { apiBaseUrl, errorResponse, successResponse } from './http.js';

const mockDoctor: IDoctor = {
  _id: '507f1f77bcf86cd799439012',
  userId: '507f1f77bcf86cd799439011',
  hospitalId: '507f1f77bcf86cd799439013',
  departmentId: '507f1f77bcf86cd799439014',
  specialization: 'General Medicine',
  experience: 12,
  consultationFee: 800,
  telemedicineFee: 600,
  availability: {
    slotDurationMinutes: 30,
    weekly: {
      monday: [{ start: '09:00', end: '12:00' }],
      wednesday: [{ start: '14:00', end: '17:00' }],
    },
  },
  qualifications: [{ degree: 'MBBS', institution: 'AIIMS', year: 2010 }],
  rating: 4.6,
  reviewCount: 128,
  bio: 'Experienced general physician.',
  languages: ['English', 'Hindi'],
  allowsInstantBooking: true,
  createdAt: '2026-08-19T08:00:00.000Z',
  updatedAt: '2026-08-19T08:00:00.000Z',
};

export const doctorHandlers = [
  http.get(`${apiBaseUrl()}/doctors`, () => {
    return successResponse(200, 'Doctors fetched successfully', [mockDoctor], {
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  }),

  http.get(`${apiBaseUrl()}/doctors/specialties`, () => {
    return successResponse(200, 'Specialties fetched successfully', [...SPECIALTIES]);
  }),

  http.get(`${apiBaseUrl()}/doctors/:id`, ({ params }) => {
    if (params.id === '000000000000000000000000') {
      return errorResponse(404, 'Doctor not found');
    }

    return successResponse(200, 'Doctor fetched successfully', {
      ...mockDoctor,
      _id: String(params.id),
    });
  }),
];
