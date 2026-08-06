import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Student,
  User,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { PaginationDto } from '../../../common/pagination/pagination.dto';
import { paginate } from '../../../common/pagination/pagination.util';

@Injectable()
export class StudentRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: Prisma.StudentCreateInput,
  ): Promise<Student> {
    return this.prisma.student.create({
      data,
    });
  }

  async findAllBySchool(
    schoolId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginationDto<Student>> {
    const where: Prisma.StudentWhereInput = {
      schoolId,
      isDeleted: false,
      ...(search
        ? {
            OR: [
              {
                admissionNo: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                firstName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                mobile: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
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
      this.prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          admissionNo: 'asc',
        },
      }),
      this.prisma.student.count({ where }),
    ]);

    return paginate(data, total, page, limit);
  }

  async findById(
    id: string,
  ): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIdAndSchool(
    id: string,
    schoolId: string,
  ): Promise<Student | null> {
    return this.prisma.student.findFirst({
      where: {
        id,
        schoolId,
        isDeleted: false,
      },
    });
  }

  async findByAdmissionNo(
    schoolId: string,
    admissionNo: string,
  ): Promise<Student | null> {
    return this.prisma.student.findFirst({
      where: {
        schoolId,
        admissionNo,
        isDeleted: false,
      },
    });
  }

  async findUserByEmail(
    email: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.StudentUpdateInput,
  ): Promise<Student> {
    return this.prisma.student.update({
      where: {
        id,
      },
      data,
    });
  }

  async softDelete(
    id: string,
    deletedBy: string,
  ): Promise<Student> {
    return this.prisma.student.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        isActive: false,
        deletedAt: new Date(),
        deletedBy,
      },
    });
  }
}
