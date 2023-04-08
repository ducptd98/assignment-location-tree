import { TypeOrmUtils } from '../utils/typeorm.util';
import { BaseEntity } from '../entities/base.entity';
import { IBaseRepository } from './base-repository.interface';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  In,
  Repository,
} from 'typeorm';
import { PaginationParams } from '../interfaces/pagination.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { handleError } from '../errors/handler-error';
import { ErrorCode } from '../errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';
import { TransactionManager } from '../database/services/transaction-manager';

export abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  protected constructor(protected readonly _repository: Repository<T>) {}

  async delete(
    id: string,
    manager: TransactionManager = this._repository.manager,
  ): Promise<T> {
    await manager.update<BaseEntity>(this._repository.target, id, {
      isActive: false,
    });
    return manager.findOne(this._repository.target, {
      where: { id },
    } as FindOneOptions);
  }

  find(
    params: FindManyOptions<T>,
    manager: TransactionManager = this._repository.manager,
  ): Promise<T[]> {
    return manager.find(this._repository.target, params);
  }

  findAndCount(
    params?: PaginationParams,
    relations: string[] = [],
    manager: TransactionManager = this._repository.manager,
  ): Promise<[T[], number]> {
    let paginator;
    if (params?.pageIndex && params?.pageSize) {
      paginator = {
        take: params.pageSize,
        skip: params.pageSize * Math.max(0, params.pageIndex - 1),
      };
    }

    let order;
    if (params?.sort && params?.sortDirection) {
      order = {
        [params.sort]: params.sortDirection,
      };
    }

    return manager.findAndCount(this._repository.target, {
      where: TypeOrmUtils.getObjectActiveQuery(),
      ...(paginator ? paginator : null),
      ...(order ? order : null),
      ...(relations?.length ? { relations } : null),
    });
  }

  findByIds(ids: string[], relations: string[] = []): Promise<T[]> {
    const relationOptions: FindManyOptions = this.getRelations(relations);
    relationOptions.where = { id: In(ids) };
    return this._repository.find(relationOptions);
  }

  findById(
    id: string,
    relations: string[] = [],
    manager: TransactionManager = this._repository.manager,
  ): Promise<T> {
    const relationOptions: FindOneOptions = this.getRelations(relations);
    relationOptions.where = { id };
    return manager.findOne(this._repository.target, relationOptions);
  }

  save(
    data: DeepPartial<T>,
    manager: TransactionManager = this._repository.manager,
  ): Promise<T> {
    return manager.save(this._repository.target, data);
  }

  saveMany(
    data: DeepPartial<T>[],
    manager: TransactionManager = this._repository.manager,
  ): Promise<T[]> {
    return manager.save(this._repository.target, data);
  }

  async update(
    id: string,
    data: QueryDeepPartialEntity<T>,
    manager = this._repository.manager,
  ): Promise<T> {
    const result = await manager.update(this._repository.target, id, data);
    if (result.affected !== 0) {
      return this.findById(id);
    } else {
      handleError('Not found', ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  protected getRelations(relations: string[] = []) {
    let findOneOptions = {};
    if (relations && relations.length > 0) {
      findOneOptions = {
        relations,
      };
    }
    return findOneOptions;
  }
}
