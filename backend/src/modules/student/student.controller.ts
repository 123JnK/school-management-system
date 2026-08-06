import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  ) {
    // Temporary schoolId
    return this.studentService.create(
      createStudentDto,
      'TEMP_SCHOOL_ID',
    );
  }

  @Get()
  findAll() {
    // Temporary schoolId
    return this.studentService.findAll(
      'TEMP_SCHOOL_ID',
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(
      id,
      updateStudentDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    // Temporary deletedBy
    return this.studentService.remove(
      id,
      'SYSTEM',
    );
  }
}