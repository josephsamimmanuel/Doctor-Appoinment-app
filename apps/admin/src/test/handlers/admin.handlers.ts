import { AppointmentStatus } from '@repo/shared/constants';
import { AppointmentMode, BookingType, VisitType } from '@repo/shared/types';
import { http } from 'msw';

import { apiBaseUrl, successResponse } from './http.js';

const mockDashboard = {
  totalAppointments: 42,
  todayAppointments: 8,
  totalDoctors: 15,
  totalPatients: 320,
  revenueToday: 12500,
  revenueThisMonth: 245000,
};

const mockAppointments = [
  {
    _id: '507f1f77bcf86cd799439031',
    patientId: '507f1f77bcf86cd799439011',
    doctorId: '507f1f77bcf86cd799439012',
    hospitalId: '507f1f77bcf86cd799439013',
    date: '2026-08-20',
    timeSlot: '10:00',
    type: BookingType.Instant,
    visitType: VisitType.Consultation,
    mode: AppointmentMode.InPerson,
    status: AppointmentStatus.Confirmed,
    createdAt: '2026-08-19T08:00:00.000Z',
    updatedAt: '2026-08-19T08:00:00.000Z',
  },
];

const mockPatients = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Asha Menon',
    email: 'asha.menon@example.com',
    phone: '9876543210',
    totalAppointments: 3,
  },
];

export const adminHandlers = [
  http.get(`${apiBaseUrl()}/admin/dashboard`, () => {
    return successResponse(200, 'Dashboard analytics fetched successfully', mockDashboard);
  }),

  http.get(`${apiBaseUrl()}/admin/appointments`, () => {
    return successResponse(200, 'Appointments fetched successfully', mockAppointments, {
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  }),

  http.get(`${apiBaseUrl()}/admin/patients`, () => {
    return successResponse(200, 'Patients fetched successfully', mockPatients, {
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  }),
];
