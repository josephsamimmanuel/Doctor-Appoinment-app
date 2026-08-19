import { z } from 'zod';
import { APPOINTMENT_MODES, VISIT_TYPES } from '../types/appointment.types.js';

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid 24-character identifier');

/** Calendar date in `YYYY-MM-DD` form. */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');

/** Slot start time on a 24-hour clock, e.g. `09:30`. */
export const timeSlotSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time slot must be in HH:mm format');

export const bookAppointmentSchema = z.object({
  doctorId: objectIdSchema,
  date: isoDateSchema,
  timeSlot: timeSlotSchema,
  mode: z.enum(APPOINTMENT_MODES),
  visitType: z.enum(VISIT_TYPES).default('consultation'),
  familyMemberId: objectIdSchema.optional(),
  reason: z.string().trim().max(500, 'Reason must be at most 500 characters').optional(),
});

export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;
