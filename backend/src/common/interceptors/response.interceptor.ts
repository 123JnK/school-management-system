import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse } from '../responses/api-response';

@Injectable()
export class ResponseInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<unknown>> {
    const request =
      context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) =>
        ApiResponse.success(
          'Request successful',
          {
            ...data,
            path: request.url,
          },
        ),
      ),
    );
  }
}