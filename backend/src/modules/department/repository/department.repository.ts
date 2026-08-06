import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

@Injectable()
export class DepartmentRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
  schoolId: string,
  dto: CreateDepartmentDto,
): Promise<Department> {
  return this.prisma.department.create({
    data: {
      schoolId,
      name: dto.name,
      code:
        dto.code ??
        dto.name
          .trim()
          .toUpperCase()
          .replace(/\s+/g, '_'),
    },
  });
}
  async findAll(
    schoolId: string,
  ): Promise<Department[]> {
    return this.prisma.department.findMany({
      where: {
        schoolId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(
    id: string,
  ): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateDepartmentDto,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        code: dto.code,
      },
    });
  }

  async delete(
    id: string,
  ): Promise<Department> {
    return this.prisma.department.delete({
      where: {
        id,
      },
    });
  }
}