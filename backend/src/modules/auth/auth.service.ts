import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const {
      schoolName,
      adminName,
      email,
      password,
    } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Email already registered',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique school code
    const schoolCode =
      'SCH' + Date.now().toString().slice(-6);

    // Create School
    const school = await this.prisma.school.create({
      data: {
        name: schoolName,
        code: schoolCode,
        email,
      },
    });

    // Split admin name
    const names = adminName.trim().split(' ');

    const firstName = names[0];

    const lastName =
      names.length > 1
        ? names.slice(1).join(' ')
        : null;

    // Create Admin User
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'ADMIN',
      },
    });

    return {
      message: 'School registered successfully',
      school,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}