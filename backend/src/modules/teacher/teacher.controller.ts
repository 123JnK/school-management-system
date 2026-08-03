import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { TeacherService } from './teacher.service';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CurrentUser } from '../../common/decorators/current-user.decorator';

import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
  ) {}

  @Get()
  async findAll(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.teacherService.findAll(
      user.schoolId!,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return this.teacherService.findOne(id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.teacherService.remove(
      id,
      user.sub,
    );
  }
}