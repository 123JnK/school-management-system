import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Student,
  User,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

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
  ): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: {
        schoolId,
        isDeleted: false,
      },
      orderBy: {
        admissionNo: 'asc',
      },
    });
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