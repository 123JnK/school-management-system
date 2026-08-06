export function generateCode(
  prefix: string,
): string {
  return `${prefix}${Date.now()}`;
}

export function fullName(
  firstName: string,
  lastName?: string,
): string {
  return lastName
    ? `${firstName} ${lastName}`
    : firstName;
}