import { Injectable } from '@nestjs/common';
import {
  Employee,
  Prisma,
  User,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

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
  ): Promise<Employee[]> {
    return this.prisma.employee.findMany({
      where: {
        schoolId,
        isDeleted: false,
      },
      orderBy: {
        employeeCode: 'asc',
      },
      include: {
        user: true,
        department: true,
        designation: true,
      },
    });
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