import { faker } from '@faker-js/faker';
import { SPECIALTIES } from '@repo/shared/constants';
import type { DayOfWeek, IDoctor } from '@repo/shared/types';

function buildTimestamps(): Pick<IDoctor, 'createdAt' | 'updatedAt'> {
  const now = new Date().toISOString();

  return {
    createdAt: now,
    updatedAt: now,
  };
}

export function buildDoctor(overrides?: Partial<IDoctor>): IDoctor {
  const id = faker.database.mongodbObjectId();

  return {
    _id: id,
    userId: faker.database.mongodbObjectId(),
    hospitalId: faker.database.mongodbObjectId(),
    departmentId: faker.database.mongodbObjectId(),
    specialization: faker.helpers.arrayElement(SPECIALTIES),
    experience: faker.number.int({ min: 1, max: 40 }),
    consultationFee: faker.number.int({ min: 300, max: 3000 }),
    telemedicineFee: faker.number.int({ min: 200, max: 2500 }),
    availability: {
      slotDurationMinutes: 30,
      weekly: {
        monday: [{ start: '09:00', end: '12:00' }],
        wednesday: [{ start: '14:00', end: '17:00' }],
        friday: [{ start: '10:00', end: '13:00' }],
      } satisfies Partial<Record<DayOfWeek, { start: string; end: string }[]>>,
    },
    qualifications: [
      {
        degree: 'MBBS',
        institution: faker.company.name(),
        year: faker.number.int({ min: 1990, max: 2020 }),
      },
    ],
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    reviewCount: faker.number.int({ min: 0, max: 500 }),
    bio: faker.lorem.paragraph(),
    languages: faker.helpers.arrayElements(['English', 'Hindi', 'Tamil', 'Telugu'], {
      min: 1,
      max: 3,
    }),
    allowsInstantBooking: true,
    ...buildTimestamps(),
    ...overrides,
  };
}
