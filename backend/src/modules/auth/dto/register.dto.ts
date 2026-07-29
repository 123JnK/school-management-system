import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @IsString()
  @IsNotEmpty()
  adminName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}