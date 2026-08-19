import { faker } from '@faker-js/faker';
import { UserRole } from '@repo/shared/constants';
import type { IUser } from '@repo/shared/types';
import type { RegisterInput } from '@repo/shared/validators';

function buildIndianPhone(): string {
  return faker.helpers.fromRegExp(/[6-9][0-9]{9}/);
}

function buildValidPassword(): string {
  return `Pass${faker.string.numeric(6)}A`;
}

function buildTimestamps(): Pick<IUser, 'createdAt' | 'updatedAt'> {
  const now = new Date().toISOString();

  return {
    createdAt: now,
    updatedAt: now,
  };
}

export function buildRegisterInput(overrides?: Partial<RegisterInput>): RegisterInput {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: buildIndianPhone(),
    password: buildValidPassword(),
    ...overrides,
  };
}

export function buildUser(overrides?: Partial<IUser>): IUser {
  const id = faker.database.mongodbObjectId();

  return {
    _id: id,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: buildIndianPhone(),
    role: UserRole.Patient,
    isEmailVerified: false,
    isPhoneVerified: false,
    ...buildTimestamps(),
    ...overrides,
  };
}

export function buildDoctorUser(overrides?: Partial<IUser>): IUser {
  return buildUser({
    role: UserRole.Doctor,
    ...overrides,
  });
}

export function buildAdminUser(overrides?: Partial<IUser>): IUser {
  return buildUser({
    role: UserRole.Admin,
    ...overrides,
  });
}

/** @deprecated Use buildUser instead. Kept for backward compatibility during M1-4 migration. */
export type TestUserData = Pick<
  IUser,
  'name' | 'email' | 'phone' | 'role' | 'isEmailVerified' | 'isPhoneVerified'
> &
  Partial<Pick<IUser, 'avatar' | 'profile' | 'familyMembers'>>;

/** @deprecated Use buildUser instead. */
export function createTestUserData(overrides?: Partial<TestUserData>): TestUserData {
  const user = buildUser(overrides);

  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    avatar: user.avatar,
    profile: user.profile,
    familyMembers: user.familyMembers,
  };
}
