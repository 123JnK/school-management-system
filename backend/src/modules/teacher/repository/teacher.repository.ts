import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Teacher,
  User,
  TeacherStatus,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { PaginationDto } from '../../../common/pagination/pagination.dto';
import { paginate } from '../../../common/pagination/pagination.util';

@Injectable()
export class TeacherRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  //==================================================
  // CREATE
  //==================================================

  async create(
    data: Prisma.TeacherCreateInput,
  ): Promise<Teacher> {
    return this.prisma.teacher.create({
      data,
    });
  }

  //==================================================
  // FIND ALL BY SCHOOL
  //==================================================

  async findAllBySchool(
    schoolId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginationDto<Teacher>> {
    const where: Prisma.TeacherWhereInput = {
      schoolId,
      teacherStatus: TeacherStatus.ACTIVE,
      ...(search
        ? {
            OR: [
              {
                teacherCode: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                employeeNumber: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                specialization: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                employee: {
                  is: {
                    firstName: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                employee: {
                  is: {
                    lastName: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                employee: {
                  is: {
                    mobile: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                employee: {
                  is: {
                    email: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          teacherCode: 'asc',
        },
      }),
      this.prisma.teacher.count({ where }),
    ]);

    return paginate(data, total, page, limit);
  }

  //==================================================
  // FIND BY ID
  //==================================================

  async findById(
    id: string,
  ): Promise<Teacher | null> {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIdAndSchool(
    id: string,
    schoolId: string,
  ): Promise<Teacher | null> {
    return this.prisma.teacher.findFirst({
      where: {
        id,
        schoolId,
        teacherStatus: TeacherStatus.ACTIVE,
      },
    });
  }

  //==================================================
  // FIND BY TEACHER CODE
  //==================================================

  async findByTeacherCode(
    schoolId: string,
    teacherCode: string,
  ): Promise<Teacher | null> {
    return this.prisma.teacher.findFirst({
      where: {
        schoolId,
        teacherCode,
      },
    });
  }

  //==================================================
  // FIND USER BY EMAIL
  //==================================================

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  //==================================================
  // UPDATE
  //==================================================

  async update(
    id: string,
    data: Prisma.TeacherUpdateInput,
  ): Promise<Teacher> {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data,
    });
  }

  //==================================================
  // SOFT DELETE
  //==================================================

  async softDelete(
    id: string,
    deletedBy: string,
  ): Promise<Teacher> {

    // Reserved for future audit implementation
    void deletedBy;

    return this.prisma.teacher.update({
      where: {
        id,
      },
      data: {
        teacherStatus: TeacherStatus.RESIGNED,
      },
    });

  }
}
