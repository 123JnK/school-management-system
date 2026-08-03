import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeacherRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.TeacherCreateInput) {
    return this.prisma.teacher.create({
      data,
    });
  }

  async findById(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.teacher.findFirst({
      where: {
        user: {
          email,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async findAllBySchool(schoolId: string) {
    return this.prisma.teacher.findMany({
      where: {
        schoolId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}