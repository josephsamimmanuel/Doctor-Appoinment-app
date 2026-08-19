export const SPECIALTIES = [
  'Cardiology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'Gynecology',
  'Neurology',
  'Ophthalmology',
  'ENT',
  'General Medicine',
  'Gastroenterology',
  'Psychiatry',
  'Dentistry',
  'Urology',
  'Pulmonology',
  'Endocrinology',
  'Oncology',
] as const;

export type Specialization = (typeof SPECIALTIES)[number];

export function isSpecialization(value: unknown): value is Specialization {
  return SPECIALTIES.includes(value as Specialization);
}
