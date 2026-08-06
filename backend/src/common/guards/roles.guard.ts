import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean {
    // Version 1:
    // Role validation will be implemented
    // after JWT authentication is completed.
    return true;
  }
}