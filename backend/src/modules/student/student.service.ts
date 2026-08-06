import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
  UserRole,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { StudentRepository } from './repository/student.repository';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentRepository: StudentRepository,
  ) {}

  async create(
    createStudentDto: CreateStudentDto,
    schoolId: string,
  ) {
    const existingStudent =
      await this.studentRepository.findByAdmissionNo(
        schoolId,
        createStudentDto.admissionNo,
      );

    if (existingStudent) {
      throw new BadRequestException(
        'Admission number already exists',
      );
    }

    let userId: string | undefined;

    if (createStudentDto.email) {
      const existingUser =
        await this.studentRepository.findUserByEmail(
          createStudentDto.email,
        );

      if (existingUser) {
        throw new BadRequestException(
          'Email already exists',
        );
      }

      const password = await bcrypt.hash(
        'Student@123',
        10,
      );

      const user = await this.prisma.user.create({
        data: {
          email: createStudentDto.email,
          password,
          firstName: createStudentDto.firstName,
          lastName: createStudentDto.lastName,
          mobile: createStudentDto.mobile,
          gender: createStudentDto.gender,
          schoolId,
          role: UserRole.STUDENT,
        },
      });

      userId = user.id;
    }

    return this.studentRepository.create({
      school: {
        connect: {
          id: schoolId,
        },
      },

      user: userId
        ? {
            connect: {
              id: userId,
            },
          }
        : undefined,

      admissionNo: createStudentDto.admissionNo,
      studentCode: createStudentDto.studentCode,
      rollNo: createStudentDto.rollNo,
      firstName: createStudentDto.firstName,
      lastName: createStudentDto.lastName,
      gender: createStudentDto.gender,
      dateOfBirth: createStudentDto.dateOfBirth
        ? new Date(createStudentDto.dateOfBirth)
        : undefined,
      bloodGroup: createStudentDto.bloodGroup,
      profilePhoto: createStudentDto.profilePhoto,
      mobile: createStudentDto.mobile,
      email: createStudentDto.email,
      address: createStudentDto.address,
      medicalConditions:
        createStudentDto.medicalConditions,
      allergies: createStudentDto.allergies,
      emergencyContact:
        createStudentDto.emergencyContact,
      admissionDate: new Date(
        createStudentDto.admissionDate,
      ),
    });
  }

  async findAll(schoolId: string) {
    return this.studentRepository.findAllBySchool(
      schoolId,
    );
  }

  async findOne(id: string) {
    const student =
      await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(
        'Student not found',
      );
    }

    return student;
  }

  async update(
    id: string,
    dto: UpdateStudentDto,
  ) {
    const student =
      await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(
        'Student not found',
      );
    }

    return this.studentRepository.update(id, {
      ...dto,
      dateOfBirth: dto.dateOfBirth
        ? new Date(dto.dateOfBirth)
        : undefined,
      admissionDate: dto.admissionDate
        ? new Date(dto.admissionDate)
        : undefined,
    });
  }

  async remove(
    id: string,
    deletedBy: string,
  ) {
    const student =
      await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(
        'Student not found',
      );
    }

    if (student.isDeleted) {
      throw new BadRequestException(
        'Student already deleted',
      );
    }

    return this.studentRepository.softDelete(
      id,
      deletedBy,
    );
  }
}