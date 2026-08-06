import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DesignationRepository } from './repository/designation.repository';

import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Injectable()
export class DesignationService {
  constructor(
    private readonly designationRepository: DesignationRepository,
  ) {}

  async create(
    schoolId: string,
    dto: CreateDesignationDto,
  ) {
    return this.designationRepository.create(
      schoolId,
      dto,
    );
  }

  async findAll(
    schoolId: string,
  ) {
    return this.designationRepository.findAll(
      schoolId,
    );
  }

  async findOne(id: string) {
    const designation =
      await this.designationRepository.findById(id);

    if (!designation) {
      throw new NotFoundException(
        'Designation not found',
      );
    }

    return designation;
  }

  async update(
    id: string,
    dto: UpdateDesignationDto,
  ) {
    await this.findOne(id);

    return this.designationRepository.update(
      id,
      dto,
    );
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.designationRepository.delete(id);
  }
}
