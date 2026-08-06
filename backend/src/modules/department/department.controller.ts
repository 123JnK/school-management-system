import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DepartmentService } from './department.service';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateDepartmentDto,
  ) {
    // Temporary hardcoded schoolId.
    // Later this will come from the authenticated JWT.
    const schoolId = 'TEMP_SCHOOL_ID';

    return this.departmentService.create(
      schoolId,
      dto,
    );
  }

  @Get()
  findAll() {
    const schoolId = 'TEMP_SCHOOL_ID';

    return this.departmentService.findAll(
      schoolId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.departmentService.remove(id);
  }
}