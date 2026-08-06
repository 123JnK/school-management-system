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
    @SchoolId() schoolId: string,
  ) {
    return this.departmentService.create(
      schoolId,
      dto,
    );
  }

  @Get()
  findAll(
    @SchoolId() schoolId: string,
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') search?: string,
  ) {
    return this.departmentService.findAll(
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
    return this.departmentService.findOne(
      id,
      schoolId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
    @SchoolId() schoolId: string,
  ) {
    return this.departmentService.update(
      id,
      dto,
      schoolId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
  ) {
    return this.departmentService.remove(
      id,
      schoolId,
    );
  }
}
