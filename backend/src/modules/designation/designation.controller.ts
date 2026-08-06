import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  ) {
    // Temporary schoolId.
    // Later this will come from JWT authentication.
    const schoolId = 'TEMP_SCHOOL_ID';

    return this.designationService.create(
      schoolId,
      dto,
    );
  }

  @Get()
  findAll() {
    const schoolId = 'TEMP_SCHOOL_ID';

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