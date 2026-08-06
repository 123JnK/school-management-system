import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { EmployeeService } from './employee.service';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    // TODO:
    // Replace the hardcoded schoolId with JWT schoolId
    return this.employeeService.create(
      createEmployeeDto,
      'demo-school-id',
    );
  }

  @Get()
  findAll() {
    // TODO:
    // Replace with schoolId from JWT
    return this.employeeService.findAll(
      'demo-school-id',
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(
      id,
      updateEmployeeDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.employeeService.remove(
      id,
      'system',
    );
  }
}