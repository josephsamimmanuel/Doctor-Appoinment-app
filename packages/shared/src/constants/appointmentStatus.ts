export const AppointmentStatus = {
  Pending: 'pending',
  Confirmed: 'confirmed',
  InProgress: 'inProgress',
  Completed: 'completed',
  Cancelled: 'cancelled',
  NoShow: 'noShow',
} as const;

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const APPOINTMENT_STATUSES = [
  AppointmentStatus.Pending,
  AppointmentStatus.Confirmed,
  AppointmentStatus.InProgress,
  AppointmentStatus.Completed,
  AppointmentStatus.Cancelled,
  AppointmentStatus.NoShow,
] as const satisfies readonly AppointmentStatus[];

/** Statuses that still occupy the doctor's slot and block re-booking. */
export const ACTIVE_APPOINTMENT_STATUSES = [
  AppointmentStatus.Pending,
  AppointmentStatus.Confirmed,
  AppointmentStatus.InProgress,
] as const satisfies readonly AppointmentStatus[];

export function isAppointmentStatus(value: unknown): value is AppointmentStatus {
  return APPOINTMENT_STATUSES.includes(value as AppointmentStatus);
}
