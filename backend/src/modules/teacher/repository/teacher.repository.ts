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
  ): Promise<Teacher[]> {
    return this.prisma.teacher.findMany({
      where: {
        schoolId,
      },
      orderBy: {
        teacherCode: 'asc',
      },
    });
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