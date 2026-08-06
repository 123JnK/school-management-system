import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
  EmployeeStatus,
  Prisma,
  UserRole,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { EmployeeRepository } from './repository/employee.repository';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async create(
    dto: CreateEmployeeDto,
    schoolId: string,
  ) {
    const existingEmail =
      await this.employeeRepository.findUserByEmail(
        dto.email,
      );

    if (existingEmail) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const existingEmployee =
      await this.employeeRepository.findByEmployeeCode(
        schoolId,
        dto.employeeCode,
      );

    if (existingEmployee) {
      throw new BadRequestException(
        'Employee code already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          mobile: dto.mobile,
          gender: dto.gender,
          role: UserRole.EMPLOYEE,
          schoolId,
        },
      });

      const employee =
        await tx.employee.create({
          data: {
            schoolId,
            userId: user.id,

            employeeCode: dto.employeeCode,

            firstName: dto.firstName,
            lastName: dto.lastName,

            gender: dto.gender,

            dateOfBirth: dto.dateOfBirth,

            mobile: dto.mobile,
            email: dto.email,
            address: dto.address,
            emergencyContact:
              dto.emergencyContact,

            departmentId:
              dto.departmentId,

            designationId:
              dto.designationId,

            joiningDate:
              dto.joiningDate,

            employmentType:
              dto.employmentType,

            qualification:
              dto.qualification,

            experienceYears:
              dto.experienceYears,

            bloodGroup:
              dto.bloodGroup,

            profilePhoto:
              dto.profilePhoto,

            status:
              EmployeeStatus.ACTIVE,
          },
        });

      return {
        message:
          'Employee created successfully',
        employee,
      };
    });
  }

  async findAll(
    schoolId: string,
  ) {
    return this.employeeRepository.findAllBySchool(
      schoolId,
    );
  }

  async findOne(
    id: string,
  ) {
    const employee =
      await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    return employee;
  }

  async update(
    id: string,
    dto: UpdateEmployeeDto,
  ) {
    await this.findOne(id);

    return this.employeeRepository.update(
      id,
      dto as Prisma.EmployeeUpdateInput,
    );
  }

  async remove(
    id: string,
    deletedBy: string,
  ) {
    await this.findOne(id);

    return this.employeeRepository.softDelete(
      id,
      deletedBy,
    );
  }
}