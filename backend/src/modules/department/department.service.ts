import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';

import { DepartmentRepository } from './repository/department.repository';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async create(
    schoolId: string,
    dto: CreateDepartmentDto,
  ) {
    return this.departmentRepository.create(
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
    const normalizedSearch = search?.trim() || undefined;

    return this.departmentRepository.findAll(
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
    const department =
      await this.departmentRepository.findByIdAndSchool(
        id,
        schoolId,
      );

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    return department;
  }

  async update(
    id: string,
    dto: UpdateDepartmentDto,
    schoolId: string,
  ) {
    await this.findOne(id, schoolId);

    return this.departmentRepository.update(
      id,
      dto,
    );
  }

  async remove(
    id: string,
    schoolId: string,
  ) {
    await this.findOne(id, schoolId);

    return this.departmentRepository.delete(id);
  }
}
