import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
  ) {
    return this.departmentRepository.findAll(
      schoolId,
    );
  }

  async findOne(id: string) {
    const department =
      await this.departmentRepository.findById(
        id,
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
  ) {
    await this.findOne(id);

    return this.departmentRepository.update(
      id,
      dto,
    );
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.departmentRepository.delete(id);
  }
}