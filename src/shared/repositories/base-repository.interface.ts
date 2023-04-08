import { DeepPartial, EntityManager, FindManyOptions } from 'typeorm';
import { PaginationParams } from '../interfaces/pagination.interface';

export interface IBaseRepository<T> {
  find(params: FindManyOptions<T>, manager?: EntityManager): Promise<T[]>;

  findAndCount(
    pagination?: PaginationParams,
    relations?: string[],
    manager?: EntityManager,
  ): Promise<[T[], number]>;

  findById(
    id: string,
    relations: string[],
    manager?: EntityManager,
  ): Promise<T>;

  findByIds(
    ids: string[],
    relations: string[],
    manager?: EntityManager,
  ): Promise<T[]>;

  save(data: DeepPartial<T>, manager?: EntityManager): Promise<T>;

  saveMany(data: DeepPartial<T>[], manager?: EntityManager): Promise<T[]>;

  update(id: string, data: any, manager?: EntityManager): Promise<T>;

  delete(id: string, manager?: EntityManager): Promise<T>;
}
