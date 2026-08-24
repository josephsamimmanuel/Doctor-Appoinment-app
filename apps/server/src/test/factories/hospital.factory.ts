import { faker } from '@faker-js/faker';

import type { DayOfWeek, IHospital } from '@repo/shared/types';

function buildTimestamps(): Pick<IHospital, 'createdAt' | 'updatedAt'> {
  const now = new Date().toISOString();

  return {
    createdAt: now,
    updatedAt: now,
  };
}

export function buildHospital(overrides?: Partial<IHospital>): IHospital {
  const id = faker.database.mongodbObjectId();
  const branchId = faker.database.mongodbObjectId();

  return {
    _id: id,
    name: `${faker.company.name()} Hospital`,
    branches: [
      {
        _id: branchId,
        name: 'Main Branch',
        address: {
          line1: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          pincode: faker.location.zipCode('######'),
          country: 'India',
        },
        phone: buildIndianPhone(),
      },
    ],
    workingHours: {
      monday: [{ start: '09:00', end: '17:00' }],
      tuesday: [{ start: '09:00', end: '17:00' }],
      wednesday: [{ start: '09:00', end: '17:00' }],
      thursday: [{ start: '09:00', end: '17:00' }],
      friday: [{ start: '09:00', end: '17:00' }],
    } satisfies Partial<Record<DayOfWeek, { start: string; end: string }[]>>,
    holidays: [],
    bookingPolicy: {
      cancellationWindowHours: 24,
      refundPercentage: 80,
      allowRescheduling: true,
      requiresApproval: false,
    },
    ...buildTimestamps(),
    ...overrides,
  };
}

function buildIndianPhone(): string {
  return faker.helpers.fromRegExp(/[6-9][0-9]{9}/);
}
