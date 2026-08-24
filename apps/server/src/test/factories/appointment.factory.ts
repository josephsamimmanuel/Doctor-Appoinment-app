import { faker } from '@faker-js/faker';

import { AppointmentStatus } from '@repo/shared/constants';
import { AppointmentMode, BookingType, type IAppointment, VisitType } from '@repo/shared/types';

function buildTimestamps(): Pick<IAppointment, 'createdAt' | 'updatedAt'> {
  const now = new Date().toISOString();

  return {
    createdAt: now,
    updatedAt: now,
  };
}

function buildFutureDate(): string {
  const date = faker.date.soon({ days: 30 });
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function buildTimeSlot(): string {
  const hour = faker.number.int({ min: 9, max: 17 });
  const minute = faker.helpers.arrayElement(['00', '15', '30', '45']);

  return `${String(hour).padStart(2, '0')}:${minute}`;
}

export function buildAppointment(overrides?: Partial<IAppointment>): IAppointment {
  const id = faker.database.mongodbObjectId();

  return {
    _id: id,
    patientId: faker.database.mongodbObjectId(),
    doctorId: faker.database.mongodbObjectId(),
    hospitalId: faker.database.mongodbObjectId(),
    date: buildFutureDate(),
    timeSlot: buildTimeSlot(),
    type: BookingType.Instant,
    visitType: VisitType.Consultation,
    mode: AppointmentMode.InPerson,
    status: AppointmentStatus.Pending,
    reason: faker.lorem.sentence(),
    ...buildTimestamps(),
    ...overrides,
  };
}
