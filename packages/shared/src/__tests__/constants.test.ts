import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ACTIVE_APPOINTMENT_STATUSES,
  APPOINTMENT_STATUSES,
  AppointmentStatus,
  HTTP_STATUS,
  SPECIALTIES,
  USER_ROLES,
  UserRole,
  isAppointmentStatus,
  isSpecialization,
  isUserRole,
} from '../constants/index.js';
import { APPOINTMENT_MODES, BOOKING_TYPES, VISIT_TYPES } from '../types/index.js';
import { PAYMENT_STATUSES, PaymentStatus } from '../types/payment.types.js';

describe('roles', () => {
  it('exports the six roles defined by the SRS actors', () => {
    assert.deepEqual(USER_ROLES, [
      'patient',
      'doctor',
      'admin',
      'superAdmin',
      'receptionist',
      'labTech',
    ]);
  });

  it('exposes each role as a named member', () => {
    assert.equal(UserRole.Patient, 'patient');
    assert.equal(UserRole.SuperAdmin, 'superAdmin');
    assert.equal(UserRole.LabTech, 'labTech');
  });

  it('narrows unknown values with its type guard', () => {
    assert.equal(isUserRole('receptionist'), true);
    assert.equal(isUserRole('nurse'), false);
  });
});

describe('appointment status', () => {
  it('exports the six lifecycle statuses', () => {
    assert.deepEqual(APPOINTMENT_STATUSES, [
      'pending',
      'confirmed',
      'inProgress',
      'completed',
      'cancelled',
      'noShow',
    ]);
  });

  it('treats only pre-completion statuses as slot-occupying', () => {
    assert.deepEqual(ACTIVE_APPOINTMENT_STATUSES, ['pending', 'confirmed', 'inProgress']);
    assert.equal(ACTIVE_APPOINTMENT_STATUSES.includes(AppointmentStatus.Completed as never), false);
  });

  it('narrows unknown values with its type guard', () => {
    assert.equal(isAppointmentStatus('noShow'), true);
    assert.equal(isAppointmentStatus('no-show'), false);
  });
});

describe('appointment modes and booking types', () => {
  it('exports in-person and video modes', () => {
    assert.deepEqual(APPOINTMENT_MODES, ['inPerson', 'video']);
  });

  it('exports instant and request booking flow types for M7', () => {
    assert.deepEqual(BOOKING_TYPES, ['instant', 'request']);
  });

  it('exports consultation, follow-up, and walk-in visit categories', () => {
    assert.deepEqual(VISIT_TYPES, ['consultation', 'followUp', 'walkIn']);
  });
});

describe('payment status', () => {
  it('exports the Razorpay lifecycle statuses expected by M8', () => {
    assert.deepEqual(PAYMENT_STATUSES, [
      'created',
      'paid',
      'failed',
      'refunded',
      'partiallyRefunded',
    ]);
    assert.equal(PaymentStatus.Created, 'created');
  });
});

describe('specialties', () => {
  it('includes the specialties named in the search requirements', () => {
    for (const specialty of [
      'Cardiology',
      'Orthopedics',
      'Dermatology',
      'Pediatrics',
      'Gynecology',
      'Neurology',
      'Ophthalmology',
    ]) {
      assert.ok(SPECIALTIES.includes(specialty as never), `missing ${specialty}`);
    }
  });

  it('contains no duplicates', () => {
    assert.equal(new Set(SPECIALTIES).size, SPECIALTIES.length);
  });

  it('narrows unknown values with its type guard', () => {
    assert.equal(isSpecialization('Cardiology'), true);
    assert.equal(isSpecialization('Astrology'), false);
  });
});

describe('http status', () => {
  it('exports the codes used by the API response helpers', () => {
    assert.equal(HTTP_STATUS.OK, 200);
    assert.equal(HTTP_STATUS.CREATED, 201);
    assert.equal(HTTP_STATUS.CONFLICT, 409);
    assert.equal(HTTP_STATUS.INTERNAL_SERVER_ERROR, 500);
  });
});
