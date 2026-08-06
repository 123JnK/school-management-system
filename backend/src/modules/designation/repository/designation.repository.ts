import { Injectable } from '@nestjs/common';
import { Designation } from '@prisma/client';

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
  ): Promise<Designation[]> {
    return this.prisma.designation.findMany({
      where: {
        schoolId,
      },
      include: {
        department: true,
      },
      orderBy: {
        level: 'asc',
      },
    });
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