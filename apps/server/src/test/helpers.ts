import { faker } from '@faker-js/faker';
import { UserRole } from '@repo/shared/constants';
import type { IUser } from '@repo/shared/types';
import supertest from 'supertest';
import app from '../app.js';

export type TestUserData = Pick<
  IUser,
  'name' | 'email' | 'phone' | 'role' | 'isEmailVerified' | 'isPhoneVerified'
> &
  Partial<Pick<IUser, 'avatar' | 'profile' | 'familyMembers'>>;

export function createTestUserData(overrides?: Partial<TestUserData>): TestUserData {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    role: UserRole.Patient,
    isEmailVerified: false,
    isPhoneVerified: false,
    ...overrides,
  };
}

export function createRequest() {
  return supertest(app);
}
