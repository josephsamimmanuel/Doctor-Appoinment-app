import mongoose from 'mongoose';
import { describe, expect, it } from 'vitest';

import {
  createTestAppointment,
  createTestDoctor,
  createTestUser,
  getAuthHeader,
  signTestJwt,
  verifyTestJwt,
} from '@test/helpers';

describe('test helpers', () => {
  it('returns a bearer authorization header', () => {
    expect(getAuthHeader('abc123')).toEqual({ Authorization: 'Bearer abc123' });
  });

  it('signs and verifies a JWT payload', () => {
    const token = signTestJwt({ userId: '507f1f77bcf86cd799439011', role: 'patient' });

    expect(token.split('.')).toHaveLength(3);
    expect(verifyTestJwt(token)).toEqual({
      userId: '507f1f77bcf86cd799439011',
      role: 'patient',
    });
  });

  it('inserts a user into the test database and returns a valid token', async () => {
    const { user, token } = await createTestUser({ name: 'Test Patient' });

    const collection = mongoose.connection.collection('users');
    const stored = await collection.findOne({ _id: new mongoose.Types.ObjectId(user._id) });

    expect(stored).not.toBeNull();
    expect(stored?.name).toBe('Test Patient');
    expect(token.split('.')).toHaveLength(3);
    expect(verifyTestJwt(token)?.userId).toBe(user._id);
  });

  it('inserts a doctor into the test database', async () => {
    const doctor = await createTestDoctor();

    const collection = mongoose.connection.collection('doctors');
    const stored = await collection.findOne({ _id: new mongoose.Types.ObjectId(doctor._id) });

    expect(stored).not.toBeNull();
    expect(stored?.userId).toBeDefined();
    expect(stored?.hospitalId).toBeDefined();
  });

  it('inserts an appointment into the test database', async () => {
    const appointment = await createTestAppointment();

    const collection = mongoose.connection.collection('appointments');
    const stored = await collection.findOne({
      _id: new mongoose.Types.ObjectId(appointment._id),
    });

    expect(stored).not.toBeNull();
    expect(stored?.patientId).toBeDefined();
    expect(stored?.doctorId).toBeDefined();
    expect(stored?.hospitalId).toBeDefined();
  });
});
