export class TeacherResponseDto {
  id: string;

  teacherCode: string;

  firstName: string;

  lastName?: string;

  email: string;

  phone?: string;

  designation?: string;

  department?: string;

  qualification?: string;

  status: string;

  joiningDate: Date;

  createdAt: Date;
}