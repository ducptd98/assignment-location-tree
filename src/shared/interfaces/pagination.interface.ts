import { SortDirection } from '../types/sort-direction.type';

export interface PaginationParams {
  pageSize?: number;
  pageIndex?: number;
  keyword?: string;
  sort?: string;
  sortDirection?: SortDirection;
}
