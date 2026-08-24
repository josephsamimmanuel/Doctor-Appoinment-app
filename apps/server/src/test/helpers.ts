import { createHmac } from 'node:crypto';

import mongoose from 'mongoose';
import supertest from 'supertest';

import { UserRole, type UserRole as UserRoleType } from '@repo/shared/constants';
import type { IAppointment, IDoctor, IUser } from '@repo/shared/types';

import app from '../app.js';
import { buildAppointment, buildDoctor, buildHospital, buildUser } from './factories/index.js';

/**
 * Migration notes for M5 (Authentication & User System)
 *
 * These helpers intentionally bypass Mongoose models and use raw collection
 * inserts plus a test-only JWT signer. When M5 lands, update internals only —
 * keep the exported function signatures stable so existing tests keep working.
 *
 * - createTestUser: switch insertDocument('users', …) to User.create() with a
 *   bcrypt-hashed password; call src/utils/jwt.ts signAccessToken() instead of
 *   signTestJwt() so tokens pass auth.middleware.ts verification.
 * - signTestJwt / verifyTestJwt: remove once real jwt.ts is available; tests
 *   that assert token shape should use tokens from the auth API or jwt utils.
 * - createTestDoctor / createTestAppointment: swap to Doctor.create() /
 *   Appointment.create() in M6/M7; collection names should stay the same.
 * - buildRegisterInput() from @test/factories remains the canonical payload for
 *   POST /auth/register integration tests — no change expected.
 */

const USERS_COLLECTION = 'users';
const DOCTORS_COLLECTION = 'doctors';
const HOSPITALS_COLLECTION = 'hospitals';
const APPOINTMENTS_COLLECTION = 'appointments';

function base64UrlEncode(value: string | Buffer): string {
  const buffer = typeof value === 'string' ? Buffer.from(value) : value;

  return buffer.toString('base64url');
}

function getJwtSecret(): string {
  return process.env.JWT_SECRET ?? 'test-jwt-secret';
}

export interface TestJwtPayload {
  userId: string;
  role: UserRoleType;
}

export function signTestJwt(payload: TestJwtPayload): string {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = createHmac('sha256', getJwtSecret())
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

export function verifyTestJwt(token: string): TestJwtPayload | null {
  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }

  const [header, body, signature] = parts as [string, string, string];
  const expectedSignature = createHmac('sha256', getJwtSecret())
    .update(`${header}.${body}`)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TestJwtPayload;

    if (typeof payload.userId !== 'string' || typeof payload.role !== 'string') {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function toObjectIdString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof mongoose.Types.ObjectId) {
    return value.toString();
  }

  throw new Error('Expected a MongoDB ObjectId or string identifier');
}

function serializeDocument<T extends { _id: unknown }>(document: T): T & { _id: string } {
  return {
    ...document,
    _id: toObjectIdString(document._id),
  };
}

async function insertDocument<T extends { _id: string }>(
  collectionName: string,
  document: T,
): Promise<T> {
  const collection = mongoose.connection.collection(collectionName);
  const { _id, ...rest } = document;
  const objectId = new mongoose.Types.ObjectId(_id);

  await collection.insertOne({ _id: objectId, ...rest });

  const inserted = await collection.findOne({ _id: objectId });

  if (inserted === null) {
    throw new Error(`Failed to insert document into ${collectionName}`);
  }

  return serializeDocument(inserted as T);
}

export function createRequest() {
  return supertest(app);
}

export function getAuthHeader(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

export interface CreateTestUserResult {
  user: IUser;
  token: string;
}

export async function createTestUser(overrides?: Partial<IUser>): Promise<CreateTestUserResult> {
  const user = await insertDocument(USERS_COLLECTION, buildUser(overrides));
  const token = signTestJwt({ userId: user._id, role: user.role });

  return { user, token };
}

export async function createTestDoctor(overrides?: Partial<IDoctor>): Promise<IDoctor> {
  let userId = overrides?.userId;
  let hospitalId = overrides?.hospitalId;
  let departmentId = overrides?.departmentId;

  if (userId === undefined) {
    const { user } = await createTestUser({ role: UserRole.Doctor });
    userId = user._id;
  }

  if (hospitalId === undefined) {
    const hospital = await insertDocument(HOSPITALS_COLLECTION, buildHospital());
    hospitalId = hospital._id;
    departmentId ??= new mongoose.Types.ObjectId().toString();
  }

  return insertDocument(
    DOCTORS_COLLECTION,
    buildDoctor({
      userId,
      hospitalId,
      departmentId: departmentId ?? new mongoose.Types.ObjectId().toString(),
      ...overrides,
    }),
  );
}

export async function createTestAppointment(
  overrides?: Partial<IAppointment>,
): Promise<IAppointment> {
  let patientId = overrides?.patientId;
  let doctorId = overrides?.doctorId;
  let hospitalId = overrides?.hospitalId;

  if (patientId === undefined) {
    const { user } = await createTestUser();
    patientId = user._id;
  }

  if (doctorId === undefined) {
    const doctor = await createTestDoctor();
    doctorId = doctor._id;
    hospitalId ??= doctor.hospitalId;
  }

  if (hospitalId === undefined) {
    const hospital = await insertDocument(HOSPITALS_COLLECTION, buildHospital());
    hospitalId = hospital._id;
  }

  return insertDocument(
    APPOINTMENTS_COLLECTION,
    buildAppointment({
      patientId,
      doctorId,
      hospitalId,
      ...overrides,
    }),
  );
}
