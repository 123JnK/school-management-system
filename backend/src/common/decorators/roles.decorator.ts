import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Role-based authorization decorator.
 *
 * Example:
 * @Roles(UserRole.PLATFORM_ADMIN)
 *
 * @Roles(UserRole.SCHOOL_ADMIN)
 *
 * @Roles(UserRole.PLATFORM_ADMIN, UserRole.SCHOOL_ADMIN)
 */
export const Roles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);