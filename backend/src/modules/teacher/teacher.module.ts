import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './repository/teacher.repository';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    TeacherController,
  ],

  providers: [
    TeacherService,
    TeacherRepository,
  ],

  exports: [
    TeacherService,
    TeacherRepository,
  ],
})
export class TeacherModule {}