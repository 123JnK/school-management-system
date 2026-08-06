import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { PaginationDto } from '../../../common/pagination/pagination.dto';
import { paginate } from '../../../common/pagination/pagination.util';

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
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginationDto<Department>> {
    const where: Prisma.DepartmentWhereInput = {
      schoolId,
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.department.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      }),
      this.prisma.department.count({ where }),
    ]);

    return paginate(data, total, page, limit);
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

  async findByIdAndSchool(
    id: string,
    schoolId: string,
  ): Promise<Department | null> {
    return this.prisma.department.findFirst({
      where: {
        id,
        schoolId,
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
