import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Teacher,
  User,
  TeacherStatus,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TeacherRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: Prisma.TeacherCreateInput,
  ): Promise<Teacher> {
    return this.prisma.teacher.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async findAllBySchool(
    schoolId: string,
  ): Promise<Teacher[]> {
    return this.prisma.teacher.findMany({
      where: {
        schoolId,
        isDeleted: false,
      },
      orderBy: {
        teacherCode: 'asc',
      },
      include: {
        user: true,
      },
    });
  }

  async findById(
    id: string,
  ): Promise<Teacher | null> {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async findByTeacherCode(
    schoolId: string,
    teacherCode: string,
  ): Promise<Teacher | null> {
    return this.prisma.teacher.findFirst({
      where: {
        schoolId,
        teacherCode,
        isDeleted: false,
      },
    });
  }

  async findByEmail(
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
    data: Prisma.TeacherUpdateInput,
  ): Promise<Teacher> {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data,
      include: {
        user: true,
      },
    });
  }

  async softDelete(
    id: string,
    deletedBy: string,
  ): Promise<Teacher> {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data: {
        status: TeacherStatus.RESIGNED,
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
        user: {
          update: {
            isActive: false,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
}