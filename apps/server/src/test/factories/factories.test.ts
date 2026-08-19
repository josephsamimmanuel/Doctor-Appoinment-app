import { isSpecialization } from '@repo/shared/constants';
import {
  bookAppointmentSchema,
  isoDateSchema,
  registerSchema,
  timeSlotSchema,
} from '@repo/shared/validators';
import { describe, expect, it } from 'vitest';

import {
  buildAppointment,
  buildDoctor,
  buildHospital,
  buildRegisterInput,
  buildUser,
} from '@test/factories';

describe('user factory', () => {
  it('generates register input that passes registerSchema validation', () => {
    const input = buildRegisterInput();
    const result = registerSchema.safeParse(input);

    expect(result.success).toBe(true);
  });

  it('applies overrides to generated user data', () => {
    const user = buildUser({ name: 'Custom Name', email: 'custom@example.com' });

    expect(user.name).toBe('Custom Name');
    expect(user.email).toBe('custom@example.com');
  });
});

describe('doctor factory', () => {
  it('generates a valid specialization enum value', () => {
    const doctor = buildDoctor();

    expect(isSpecialization(doctor.specialization)).toBe(true);
  });
});

describe('appointment factory', () => {
  it('generates date and time slot values that pass shared validators', () => {
    const appointment = buildAppointment();

    expect(isoDateSchema.safeParse(appointment.date).success).toBe(true);
    expect(timeSlotSchema.safeParse(appointment.timeSlot).success).toBe(true);
  });

  it('generates booking input compatible with bookAppointmentSchema', () => {
    const appointment = buildAppointment();
    const result = bookAppointmentSchema.safeParse({
      doctorId: appointment.doctorId,
      date: appointment.date,
      timeSlot: appointment.timeSlot,
      mode: appointment.mode,
      visitType: appointment.visitType,
      reason: appointment.reason,
    });

    expect(result.success).toBe(true);
  });
});

describe('hospital factory', () => {
  it('generates a hospital with at least one branch and booking policy', () => {
    const hospital = buildHospital();

    expect(hospital.branches.length).toBeGreaterThan(0);
    expect(hospital.bookingPolicy.cancellationWindowHours).toBeGreaterThan(0);
  });
});
