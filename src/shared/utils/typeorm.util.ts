import { SelectQueryBuilder } from 'typeorm';
import { PaginationParams } from '../interfaces/pagination.interface';

export class TypeOrmUtils {
  public static getActiveQuery(alias: string): string {
    return `${alias}.isActive = TRUE`;
  }

  public static getRawActiveQuery(alias: string): string {
    return `${alias}.isActive = TRUE`;
  }

  public static getObjectActiveQuery() {
    return {
      isActive: true,
    };
  }

  public static getDeletedObjectQuery() {
    return {
      isActive: false,
    };
  }

  public static addWhereConditionInList(
    query: SelectQueryBuilder<any>,
    field: string,
    ids: string[],
  ): any {
    if (!ids?.length) {
      return;
    }
    query.andWhere(`${field} IN (:...ids)`, { ids });
  }

  public static existsQuery = <T>(builder: SelectQueryBuilder<T>) =>
    `exists (${builder.getQuery()})`;

  public static addPagingForQueryGetRaw(
    query: SelectQueryBuilder<any>,
    paging: PaginationParams,
  ) {
    if (paging) {
      query
        .limit(paging.pageSize)
        .offset(paging.pageSize * Math.max(0, paging.pageIndex - 1));
    }
  }

  public static addPagingForQueryGetMany(
    query: SelectQueryBuilder<any>,
    paging: PaginationParams,
  ) {
    if (paging) {
      query
        .take(paging.pageSize)
        .skip(paging.pageSize * Math.max(0, paging.pageIndex - 1));
    }
  }
}
