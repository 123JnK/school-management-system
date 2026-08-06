import { Injectable } from '@nestjs/common';
import {
  Designation,
  Prisma,
} from '@prisma/client';

import { PaginationDto } from '../../../common/pagination/pagination.dto';
import { paginate } from '../../../common/pagination/pagination.util';
import { PrismaService } from '../../../prisma/prisma.service';

import { CreateDesignationDto } from '../dto/create-designation.dto';
import { UpdateDesignationDto } from '../dto/update-designation.dto';

@Injectable()
export class DesignationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    schoolId: string,
    dto: CreateDesignationDto,
  ): Promise<Designation> {
    return this.prisma.designation.create({
      data: {
        schoolId,
        departmentId: dto.departmentId,
        name: dto.name,
        level: dto.level ?? 1,
        description: dto.description,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll(
    schoolId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginationDto<Designation>> {
    const where: Prisma.DesignationWhereInput = {
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
            ],
          }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.designation.findMany({
        where,
        include: {
          department: true,
        },
        orderBy: {
          level: 'asc',
        },
        skip,
        take: limit,
      }),
      this.prisma.designation.count({
        where,
      }),
    ]);

    return paginate(
      data,
      total,
      page,
      limit,
    );
  }

  async findById(
    id: string,
  ): Promise<Designation | null> {
    return this.prisma.designation.findUnique({
      where: {
        id,
      },
      include: {
        department: true,
      },
    });
  }

  async findByIdAndSchool(
    id: string,
    schoolId: string,
  ): Promise<Designation | null> {
    return this.prisma.designation.findFirst({
      where: {
        id,
        schoolId,
      },
      include: {
        department: true,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateDesignationDto,
  ): Promise<Designation> {
    return this.prisma.designation.update({
      where: {
        id,
      },
      data: {
        departmentId: dto.departmentId,
        name: dto.name,
        level: dto.level,
        description: dto.description,
        isActive: dto.isActive,
      },
    });
  }

  async delete(
    id: string,
  ): Promise<Designation> {
    return this.prisma.designation.delete({
      where: {
        id,
      },
    });
  }
}