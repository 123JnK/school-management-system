import { PaginationDto } from './pagination.dto';

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginationDto<T> {
  return new PaginationDto(
    data,
    total,
    page,
    limit,
  );
}