import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './repository/employee.repository';

@Module({
  imports: [PrismaModule],

  controllers: [EmployeeController],

  providers: [
    EmployeeService,
    EmployeeRepository,
  ],

  exports: [
    EmployeeService,
    EmployeeRepository,
  ],
})
export class EmployeeModule {}