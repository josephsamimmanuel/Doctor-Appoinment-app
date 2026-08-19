import type { AppointmentStatus } from '../constants/appointmentStatus.js';
import type {
  IsoDateString,
  IsoDateTimeString,
  ObjectIdString,
  Timestamps,
  TimeString,
} from './common.types.js';

export const AppointmentMode = {
  InPerson: 'inPerson',
  Video: 'video',
} as const;

export type AppointmentMode = (typeof AppointmentMode)[keyof typeof AppointmentMode];

export const APPOINTMENT_MODES = [
  AppointmentMode.InPerson,
  AppointmentMode.Video,
] as const satisfies readonly AppointmentMode[];

/**
 * Booking flow — whether payment confirms the appointment immediately or
 * requires admin/doctor approval (FR-P-021 / FR-P-022, M7-1).
 */
export const BookingType = {
  Instant: 'instant',
  Request: 'request',
} as const;

export type BookingType = (typeof BookingType)[keyof typeof BookingType];

export const BOOKING_TYPES = [
  BookingType.Instant,
  BookingType.Request,
] as const satisfies readonly BookingType[];

/**
 * Clinical visit category — distinct from booking flow (FR-P-027, FR-A-023).
 */
export const VisitType = {
  Consultation: 'consultation',
  FollowUp: 'followUp',
  WalkIn: 'walkIn',
} as const;

export type VisitType = (typeof VisitType)[keyof typeof VisitType];

export const VISIT_TYPES = [
  VisitType.Consultation,
  VisitType.FollowUp,
  VisitType.WalkIn,
] as const satisfies readonly VisitType[];

export interface IAppointment extends Timestamps {
  _id: ObjectIdString;
  patientId: ObjectIdString;
  doctorId: ObjectIdString;
  hospitalId: ObjectIdString;
  familyMemberId?: ObjectIdString;
  date: IsoDateString;
  timeSlot: TimeString;
  /** Booking flow stored on the appointment document (M7-1 `type` field). */
  type: BookingType;
  /** Clinical visit category; defaults to consultation for online bookings. */
  visitType?: VisitType;
  mode: AppointmentMode;
  status: AppointmentStatus;
  reason?: string;
  dailyRoomUrl?: string;
  cancelledAt?: IsoDateTimeString;
  cancellationReason?: string;
}
