export const UserRole = {
  Patient: 'patient',
  Doctor: 'doctor',
  Admin: 'admin',
  SuperAdmin: 'superAdmin',
  Receptionist: 'receptionist',
  LabTech: 'labTech',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const USER_ROLES = [
  UserRole.Patient,
  UserRole.Doctor,
  UserRole.Admin,
  UserRole.SuperAdmin,
  UserRole.Receptionist,
  UserRole.LabTech,
] as const satisfies readonly UserRole[];

export const ADMIN_APP_ROLES = [
  UserRole.Doctor,
  UserRole.Admin,
  UserRole.SuperAdmin,
  UserRole.Receptionist,
  UserRole.LabTech,
] as const satisfies readonly UserRole[];

export function isUserRole(value: unknown): value is UserRole {
  return USER_ROLES.includes(value as UserRole);
}
