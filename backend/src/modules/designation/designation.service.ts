import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';

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
    paginationQuery: PaginationQueryDto,
    search?: string,
  ) {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 10;
    const normalizedSearch =
      search?.trim() || undefined;

    return this.designationRepository.findAll(
      schoolId,
      page,
      limit,
      normalizedSearch,
    );
  }

  async findOne(
    id: string,
    schoolId: string,
  ) {
    const designation =
      await this.designationRepository.findByIdAndSchool(
        id,
        schoolId,
      );

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
    schoolId: string,
  ) {
    await this.findOne(
      id,
      schoolId,
    );

    return this.designationRepository.update(
      id,
      dto,
    );
  }

  async remove(
    id: string,
    schoolId: string,
  ) {
    await this.findOne(
      id,
      schoolId,
    );

    return this.designationRepository.delete(
      id,
    );
  }
}