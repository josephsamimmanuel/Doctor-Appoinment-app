import type {
  DayOfWeek,
  IsoDateString,
  ObjectIdString,
  Timestamps,
  TimeRange,
} from './common.types.js';
import type { IAddress } from './user.types.js';

export interface IHospitalBranch {
  _id: ObjectIdString;
  name: string;
  address: IAddress;
  phone?: string;
}

export interface IBookingPolicy {
  /** Hours before the appointment during which cancellation is still allowed. */
  cancellationWindowHours: number;
  /** Percentage of the fee refunded for an in-window cancellation (0-100). */
  refundPercentage: number;
  allowRescheduling: boolean;
  requiresApproval: boolean;
}

export interface IHospital extends Timestamps {
  _id: ObjectIdString;
  name: string;
  logo?: string;
  branches: IHospitalBranch[];
  workingHours: Partial<Record<DayOfWeek, TimeRange>>;
  holidays: IsoDateString[];
  bookingPolicy: IBookingPolicy;
}

export interface IDepartment extends Timestamps {
  _id: ObjectIdString;
  hospitalId: ObjectIdString;
  name: string;
  description?: string;
  doctorIds: ObjectIdString[];
}
