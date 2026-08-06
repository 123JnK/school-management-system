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

import { DesignationService } from './designation.service';

import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Controller('designations')
export class DesignationController {
  constructor(
    private readonly designationService: DesignationService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateDesignationDto,
    @SchoolId() schoolId: string,
  ) {
    return this.designationService.create(
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
    return this.designationService.findAll(
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
    return this.designationService.findOne(
      id,
      schoolId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDesignationDto,
    @SchoolId() schoolId: string,
  ) {
    return this.designationService.update(
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
    return this.designationService.remove(
      id,
      schoolId,
    );
  }
}