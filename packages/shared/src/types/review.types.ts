import type { ObjectIdString, Timestamps } from './common.types.js';

export interface IReview extends Timestamps {
  _id: ObjectIdString;
  doctorId: ObjectIdString;
  patientId: ObjectIdString;
  appointmentId?: ObjectIdString;
  /** Whole-star rating from 1 to 5. */
  rating: number;
  comment?: string;
}
