import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { SchoolId } from '../../common/decorators/school-id.decorator';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';

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
    @SchoolId() schoolId: string,
  ) {
    return this.employeeService.create(
      createEmployeeDto,
      schoolId,
    );
  }

  @Get()
  findAll(
    @SchoolId() schoolId: string,
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') search?: string,
  ) {
    return this.employeeService.findAll(
      schoolId,
      paginationQuery,
      search,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
  ) {
    return this.employeeService.findOne(
      id,
      schoolId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @SchoolId() schoolId: string,
  ) {
    return this.employeeService.update(
      id,
      updateEmployeeDto,
      schoolId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
  ) {
    return this.employeeService.remove(
      id,
      'system',
      schoolId,
    );
  }
}
