import { Injectable } from '@nestjs/common';
import {
  Employee,
  Prisma,
  User,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { PaginationDto } from '../../../common/pagination/pagination.dto';
import { paginate } from '../../../common/pagination/pagination.util';

@Injectable()
export class EmployeeRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: Prisma.EmployeeCreateInput,
  ): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  async findAllBySchool(
    schoolId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginationDto<Employee>> {
    const where: Prisma.EmployeeWhereInput = {
      schoolId,
      isDeleted: false,
      ...(search
        ? {
            OR: [
              {
                employeeCode: {
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
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          employeeCode: 'asc',
        },
        include: {
          user: true,
          department: true,
          designation: true,
        },
      }),
      this.prisma.employee.count({ where }),
    ]);

    return paginate(data, total, page, limit);
  }

  async findById(
    id: string,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        department: true,
        designation: true,
      },
    });
  }

  async findByIdAndSchool(
    id: string,
    schoolId: string,
  ): Promise<Employee | null> {
    return this.prisma.employee.findFirst({
      where: {
        id,
        schoolId,
        isDeleted: false,
      },
      include: {
        user: true,
        department: true,
        designation: true,
      },
    });
  }

  async findByEmployeeCode(
    schoolId: string,
    employeeCode: string,
  ): Promise<Employee | null> {
    return this.prisma.employee.findFirst({
      where: {
        schoolId,
        employeeCode,
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
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: {
        id,
      },
      data,
      include: {
        user: true,
        department: true,
        designation: true,
      },
    });
  }

  async softDelete(
    id: string,
    deletedBy: string,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
        status: 'INACTIVE',
        user: {
          update: {
            isActive: false,
          },
        },
      },
    });
  }
}
