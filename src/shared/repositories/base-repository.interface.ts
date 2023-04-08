import { DeepPartial, EntityManager, FindManyOptions } from 'typeorm';
import { PaginationParams } from '../interfaces/pagination.interface';
import { TransactionManager } from '../database/services/transaction-manager';

export interface IBaseRepository<T> {
  find(params: FindManyOptions<T>, manager?: EntityManager): Promise<T[]>;

  findAndCount(
    pagination?: PaginationParams,
    relations?: string[],
    manager?: TransactionManager,
  ): Promise<[T[], number]>;

  findById(
    id: string,
    relations: string[],
    manager?: TransactionManager,
  ): Promise<T>;

  findByIds(
    ids: string[],
    relations: string[],
    manager?: TransactionManager,
  ): Promise<T[]>;

  save(data: DeepPartial<T>, manager?: TransactionManager): Promise<T>;

  saveMany(data: DeepPartial<T>[], manager?: TransactionManager): Promise<T[]>;

  update(id: string, data: any, manager?: TransactionManager): Promise<T>;

  delete(id: string, manager?: TransactionManager): Promise<T>;
}
