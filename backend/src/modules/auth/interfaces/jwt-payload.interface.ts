export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  schoolId: string | null;
}