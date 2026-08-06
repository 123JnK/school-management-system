import {
  ValidationPipe,
} from '@nestjs/common';

import {
  NestFactory,
} from '@nestjs/core';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );

  app.enableCors();

  await app.listen(3001);

  console.log(
    '🚀 Backend running on http://localhost:3001',
  );
}

bootstrap();