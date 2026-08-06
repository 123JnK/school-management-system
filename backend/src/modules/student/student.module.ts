import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './repository/student.repository';

@Module({
  imports: [PrismaModule],

  controllers: [StudentController],

  providers: [
    StudentService,
    StudentRepository,
  ],

  exports: [
    StudentService,
    StudentRepository,
  ],
})
export class StudentModule {}