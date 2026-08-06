import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
  EmploymentType,
  EmployeeStatus,
  TeacherStatus,
  UserRole,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';

import { TeacherRepository } from './repository/teacher.repository';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  //--------------------------------------------------------
  // CREATE TEACHER
  //--------------------------------------------------------

  async create(
    createTeacherDto: CreateTeacherDto,
    schoolId: string,
  ) {
    const existingUser =
      await this.teacherRepository.findByEmail(
        createTeacherDto.email,
      );

    if (existingUser) {
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
        'Teacher Code already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createTeacherDto.password,
      10,
    );

    return this.prisma.$transaction(async (tx) => {

      //----------------------------------------------------
      // USER
      //----------------------------------------------------

      const user = await tx.user.create({
        data: {
          email: createTeacherDto.email,
          password: hashedPassword,

          firstName: createTeacherDto.firstName,
          lastName: createTeacherDto.lastName,

          mobile: createTeacherDto.mobile,

          gender: createTeacherDto.gender,

          schoolId,

          role: UserRole.EMPLOYEE,
        },
      });

      //----------------------------------------------------
      // EMPLOYEE
      //----------------------------------------------------

      const employee = await tx.employee.create({
        data: {

          schoolId,

          userId: user.id,

          employeeCode:
            createTeacherDto.employeeCode,

          firstName:
            createTeacherDto.firstName,

          lastName:
            createTeacherDto.lastName,

          gender:
            createTeacherDto.gender,

          mobile:
            createTeacherDto.mobile,

          email:
            createTeacherDto.email,

          address:
            createTeacherDto.address,

          emergencyContact:
            createTeacherDto.emergencyContact,

          joiningDate:
            new Date(createTeacherDto.joiningDate),

          employmentType:
            createTeacherDto.employmentType ??
            EmploymentType.FULL_TIME,

          status:
            EmployeeStatus.ACTIVE,

          departmentId:
            createTeacherDto.departmentId,

          designationId:
            createTeacherDto.designationId,

          qualification:
            createTeacherDto.qualification,

          experienceYears:
            createTeacherDto.experienceYears,

          bloodGroup:
            createTeacherDto.bloodGroup,

          profilePhoto:
            createTeacherDto.profilePhoto,

          dateOfBirth:
            createTeacherDto.dateOfBirth
              ? new Date(createTeacherDto.dateOfBirth)
              : null,
        },
      });

      //----------------------------------------------------
      // TEACHER
      //----------------------------------------------------

      const teacher =
        await tx.teacher.create({
          data: {

            employeeId:
              employee.id,

            schoolId,

            teacherCode:
              createTeacherDto.teacherCode,

            employeeNumber:
              createTeacherDto.employeeNumber,

            joiningDate:
              new Date(createTeacherDto.joiningDate),

            teacherStatus:
              TeacherStatus.ACTIVE,

            highestQualification:
              createTeacherDto.highestQualification,

            specialization:
              createTeacherDto.specialization,

            university:
              createTeacherDto.university,

            teachingExperience:
              createTeacherDto.teachingExperience,

            boardRegistrationNo:
              createTeacherDto.boardRegistrationNo,

            aadhaarNumber:
              createTeacherDto.aadhaarNumber,

            panNumber:
              createTeacherDto.panNumber,
          },
        });

      return {
        message: 'Teacher created successfully',
        teacher,
      };
    });
  }

  //--------------------------------------------------------
  // FIND ALL
  //--------------------------------------------------------

  async findAll(
    schoolId: string,
    paginationQuery: PaginationQueryDto,
    search?: string,
  ) {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 10;
    const normalizedSearch = search?.trim() || undefined;

    return this.teacherRepository.findAllBySchool(
      schoolId,
      page,
      limit,
      normalizedSearch,
    );
  }

  //--------------------------------------------------------
  // FIND ONE
  //--------------------------------------------------------

  async findOne(
    id: string,
    schoolId: string,
  ) {

    const teacher =
      await this.teacherRepository.findByIdAndSchool(
        id,
        schoolId,
      );

    if (!teacher) {
      throw new NotFoundException(
        'Teacher not found',
      );
    }

    return teacher;
  }

  //--------------------------------------------------------
  // UPDATE
  //--------------------------------------------------------

  async update(
    id: string,
    dto: UpdateTeacherDto,
    schoolId: string,
  ) {

    await this.findOne(id, schoolId);

    return this.teacherRepository.update(
      id,
      dto,
    );
  }

  //--------------------------------------------------------
  // DELETE
  //--------------------------------------------------------

  async remove(
    id: string,
    deletedBy: string,
    schoolId: string,
  ) {

    await this.findOne(id, schoolId);

    return this.teacherRepository.softDelete(
      id,
      deletedBy,
    );
  }
}
