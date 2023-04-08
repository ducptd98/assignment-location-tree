import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionManager } from './transaction-manager';

@Injectable()
export class TransactionManagerService {
  constructor(private readonly dataSource: DataSource) {}

  public async performActionInTransaction(
    handler: (manager: TransactionManager) => void,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      await handler(manager);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
