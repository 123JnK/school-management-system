import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const {
      schoolName,
      adminName,
      email,
      password,
    } = registerDto;

    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'Email already registered',
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const schoolCode =
      'SCH' + Date.now().toString().slice(-6);

    const school =
      await this.prisma.school.create({
        data: {
          name: schoolName,
          code: schoolCode,
          email,
        },
      });

    const names =
      adminName.trim().split(' ');

    const firstName = names[0];

    const lastName =
      names.length > 1
        ? names.slice(1).join(' ')
        : null;

    const user =
      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: UserRole.SCHOOL_ADMIN,
          schoolId: school.id,
        },
      });

    return {
      success: true,
      message: 'School registered successfully',

      school,

      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        schoolId: user.schoolId,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    if (!user.isActive) {
      throw new BadRequestException(
        'User account is inactive',
      );
    }

    const passwordMatched =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!passwordMatched) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    };

    const accessToken =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      success: true,
      message: 'Login successful',

      accessToken,

      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        schoolId: user.schoolId,
      },
    };
  }
}