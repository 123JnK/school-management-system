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

import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
    @SchoolId() schoolId: string,
  ) {
    return this.studentService.create(
      createStudentDto,
      schoolId,
    );
  }

  @Get()
  findAll(
    @SchoolId() schoolId: string,
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') search?: string,
  ) {
    return this.studentService.findAll(
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
    return this.studentService.findOne(
      id,
      schoolId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @SchoolId() schoolId: string,
  ) {
    return this.studentService.update(
      id,
      updateStudentDto,
      schoolId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
  ) {
    // Temporary deletedBy
    return this.studentService.remove(
      id,
      'SYSTEM',
      schoolId,
    );
  }
}
