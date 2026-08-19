import type { Specialization } from '../constants/specialties.js';
import type { DayOfWeek, ObjectIdString, Timestamps, TimeRange } from './common.types.js';

export interface IQualification {
  degree: string;
  institution?: string;
  year?: number;
}

export interface IDoctorAvailability {
  slotDurationMinutes: number;
  weekly: Partial<Record<DayOfWeek, TimeRange[]>>;
}

export interface IDoctor extends Timestamps {
  _id: ObjectIdString;
  userId: ObjectIdString;
  hospitalId: ObjectIdString;
  departmentId: ObjectIdString;
  specialization: Specialization;
  experience: number;
  consultationFee: number;
  telemedicineFee?: number;
  availability: IDoctorAvailability;
  qualifications: IQualification[];
  rating: number;
  reviewCount: number;
  bio?: string;
  languages?: string[];
  allowsInstantBooking: boolean;
}
