import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
  EmploymentType,
  TeacherStatus,
  UserRole,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { TeacherRepository } from './repository/teacher.repository';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async create(
    createTeacherDto: CreateTeacherDto,
    schoolId: string,
  ) {
    const existingEmail =
      await this.teacherRepository.findByEmail(
        createTeacherDto.email,
      );

    if (existingEmail) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const existingTeacher =
      await this.teacherRepository.findByTeacherCode(
        schoolId,
        createTeacherDto.teacherCode,
      );

    if (existingTeacher) {
      throw new BadRequestException(
        'Teacher code already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createTeacherDto.password,
      10,
    );

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: createTeacherDto.email,
          password: hashedPassword,
          firstName: createTeacherDto.firstName,
          lastName: createTeacherDto.lastName,
          phone: createTeacherDto.phone,
          gender: createTeacherDto.gender,
          role: UserRole.TEACHER,
          schoolId,
        },
      });

      const teacher = await tx.teacher.create({
        data: {
          teacherCode: createTeacherDto.teacherCode,
          userId: user.id,
          schoolId,

          designation:
            createTeacherDto.designation,

          department:
            createTeacherDto.department,

          qualification:
            createTeacherDto.qualification,

          experienceYears:
            createTeacherDto.experienceYears,

          employmentType:
            createTeacherDto.employmentType ??
            EmploymentType.FULL_TIME,

          joiningDate:
            createTeacherDto.joiningDate,

          dateOfBirth:
            createTeacherDto.dateOfBirth,

          bloodGroup:
            createTeacherDto.bloodGroup,

          address:
            createTeacherDto.address,

          emergencyContact:
            createTeacherDto.emergencyContact,

          photo:
            createTeacherDto.photo,

          status: TeacherStatus.ACTIVE,
        },
      });

      return {
        message: 'Teacher created successfully',
        teacher,
      };
    });
  }

  async findAll(
    schoolId: string,
  ) {
    return this.teacherRepository.findAllBySchool(
      schoolId,
    );
  }

  async findOne(
    id: string,
  ) {
    const teacher =
      await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException(
        'Teacher not found',
      );
    }

    return teacher;
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ) {
    const teacher =
      await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException(
        'Teacher not found',
      );
    }

    return this.teacherRepository.update(
      id,
      updateTeacherDto,
    );
  }

  async remove(
    id: string,
    deletedBy: string,
  ) {
    const teacher =
      await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException(
        'Teacher not found',
      );
    }

    if (teacher.isDeleted) {
      throw new BadRequestException(
        'Teacher is already deleted',
      );
    }

    return this.teacherRepository.softDelete(
      id,
      deletedBy,
    );
  }
}