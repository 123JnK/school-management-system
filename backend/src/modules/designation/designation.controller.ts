import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SchoolId } from '../../common/decorators/school-id.decorator';

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
  ) {
    return this.designationService.findAll(
      schoolId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.designationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDesignationDto,
  ) {
    return this.designationService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.designationService.remove(id);
  }
}
