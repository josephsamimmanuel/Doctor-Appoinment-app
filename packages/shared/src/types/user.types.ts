import type { UserRole } from '../constants/roles.js';
import type { IsoDateString, ObjectIdString, Timestamps } from './common.types.js';

export type Gender = 'male' | 'female' | 'other';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface IAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface IUserProfile {
  dateOfBirth?: IsoDateString;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  allergies?: string[];
  medicalHistory?: string[];
  address?: IAddress;
}

export interface IFamilyMember {
  _id: ObjectIdString;
  name: string;
  relationship: string;
  dateOfBirth?: IsoDateString;
  gender?: Gender;
  bloodGroup?: BloodGroup;
}

export interface IUser extends Timestamps {
  _id: ObjectIdString;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  profile?: IUserProfile;
  familyMembers?: IFamilyMember[];
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}
