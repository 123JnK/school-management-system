import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SchoolGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request =
      context.switchToHttp().getRequest();

    if (!request.user?.schoolId) {
      throw new UnauthorizedException(
        'School information not found.',
      );
    }

    return true;
  }
}