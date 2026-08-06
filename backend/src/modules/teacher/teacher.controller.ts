import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SchoolId } from '../../common/decorators/school-id.decorator';
import { TeacherService } from './teacher.service';

import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CurrentUser } from '../../common/decorators/current-user.decorator';

import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
  ) {}

  @Post()
  async create(
    @Body() createTeacherDto: CreateTeacherDto,
    @SchoolId() schoolId: string,
  ) {
    return this.teacherService.create(
      createTeacherDto,
      schoolId,
    );
  }

  @Get()
  async findAll(
    @SchoolId() schoolId: string,
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') search?: string,
  ) {
    return this.teacherService.findAll(
      schoolId,
      paginationQuery,
      search,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
  ) {
    return this.teacherService.findOne(
      id,
      schoolId,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @SchoolId() schoolId: string,
  ) {
    return this.teacherService.update(
      id,
      updateTeacherDto,
      schoolId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @SchoolId() schoolId: string,
  ) {
    return this.teacherService.remove(
      id,
      user.sub,
      schoolId,
    );
  }
}
