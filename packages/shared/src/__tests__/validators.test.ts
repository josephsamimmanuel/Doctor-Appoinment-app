import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { ZodError } from 'zod';

import { bookAppointmentSchema, loginSchema, registerSchema } from '../validators/index.js';

function messagesOf(error: ZodError): string[] {
  return error.issues.map((issue) => issue.message);
}

function assertParseFailure<T>(result: { success: boolean; error?: ZodError; data?: T }): ZodError {
  assert.equal(result.success, false);
  if (result.success || result.error === undefined) {
    assert.fail('Expected parse to fail');
  }

  return result.error;
}

const validRegistration = {
  name: 'Asha Menon',
  email: 'Asha.Menon@Example.com',
  phone: '9876543210',
  password: 'Str0ngPass',
};

describe('registerSchema', () => {
  it('accepts a valid registration and normalizes the email', () => {
    const result = registerSchema.safeParse(validRegistration);

    assert.equal(result.success, true);
    assert.equal(result.data?.email, 'asha.menon@example.com');
    assert.equal(result.data?.name, 'Asha Menon');
  });

  it('trims surrounding whitespace from the name', () => {
    const result = registerSchema.safeParse({ ...validRegistration, name: '  Asha Menon  ' });

    assert.equal(result.success, true);
    assert.equal(result.data?.name, 'Asha Menon');
  });

  it('rejects a malformed email', () => {
    const result = registerSchema.safeParse({ ...validRegistration, email: 'not-an-email' });

    assert.equal(result.success, false);
    assert.ok(messagesOf(assertParseFailure(result)).includes('Enter a valid email address'));
  });

  it('rejects a password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({ ...validRegistration, password: 'Ab1' });

    assert.equal(result.success, false);
    assert.ok(
      messagesOf(assertParseFailure(result)).includes(
        'Password must be at least 8 characters long',
      ),
    );
  });

  it('rejects a password without an uppercase letter', () => {
    const result = registerSchema.safeParse({ ...validRegistration, password: 'str0ngpass' });

    assert.equal(result.success, false);
    assert.ok(
      messagesOf(assertParseFailure(result)).includes(
        'Password must contain at least one uppercase letter',
      ),
    );
  });

  it('rejects a password without a number', () => {
    const result = registerSchema.safeParse({ ...validRegistration, password: 'StrongPass' });

    assert.equal(result.success, false);
    assert.ok(
      messagesOf(assertParseFailure(result)).includes('Password must contain at least one number'),
    );
  });

  it('rejects a phone number that is not a 10-digit Indian mobile', () => {
    const result = registerSchema.safeParse({ ...validRegistration, phone: '12345' });

    assert.equal(result.success, false);
    assert.ok(
      messagesOf(assertParseFailure(result)).includes(
        'Enter a valid 10-digit Indian mobile number',
      ),
    );
  });

  it('rejects a payload with missing fields', () => {
    const result = registerSchema.safeParse({ email: validRegistration.email });

    assert.equal(result.success, false);
    assert.equal(result.error?.issues.length, 3);
  });
});

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({ email: 'asha@example.com', password: 'Str0ngPass' });

    assert.equal(result.success, true);
  });

  it('rejects a malformed email', () => {
    const result = loginSchema.safeParse({ email: 'asha@', password: 'Str0ngPass' });

    assert.equal(result.success, false);
  });

  it('rejects an empty password', () => {
    const result = loginSchema.safeParse({ email: 'asha@example.com', password: '' });

    assert.equal(result.success, false);
    assert.ok(messagesOf(assertParseFailure(result)).includes('Password is required'));
  });

  it('does not enforce registration password strength on login', () => {
    const result = loginSchema.safeParse({ email: 'asha@example.com', password: 'weak' });

    assert.equal(result.success, true);
  });
});

describe('bookAppointmentSchema', () => {
  const validBooking = {
    doctorId: '507f1f77bcf86cd799439011',
    date: '2026-09-01',
    timeSlot: '09:30',
    mode: 'inPerson',
  };

  it('accepts a valid booking and defaults the visit type', () => {
    const result = bookAppointmentSchema.safeParse(validBooking);

    assert.equal(result.success, true);
    assert.equal(result.data?.visitType, 'consultation');
  });

  it('rejects an identifier that is not a 24-character hex string', () => {
    const result = bookAppointmentSchema.safeParse({ ...validBooking, doctorId: 'abc' });

    assert.equal(result.success, false);
  });

  it('rejects an unknown appointment mode', () => {
    const result = bookAppointmentSchema.safeParse({ ...validBooking, mode: 'phone' });

    assert.equal(result.success, false);
  });

  it('rejects a date that is not in YYYY-MM-DD form', () => {
    const result = bookAppointmentSchema.safeParse({ ...validBooking, date: '01-09-2026' });

    assert.equal(result.success, false);
    assert.ok(messagesOf(assertParseFailure(result)).includes('Date must be in YYYY-MM-DD format'));
  });

  it('rejects a time slot outside the 24-hour clock', () => {
    const result = bookAppointmentSchema.safeParse({ ...validBooking, timeSlot: '25:00' });

    assert.equal(result.success, false);
    assert.ok(messagesOf(assertParseFailure(result)).includes('Time slot must be in HH:mm format'));
  });
});
