import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { TransactionManager } from '../../../shared/database/services/transaction-manager';
import { handleError } from '../../../shared/errors/handler-error';
import { ErrorCode } from '../../../shared/errors/error-code.enum';

@Injectable()
export class LocationRepository extends BaseRepository<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    protected repository: Repository<LocationEntity>,
  ) {
    super(repository);
  }

  public async updateOneByLocationNumber(
    number: string,
    input: Partial<LocationEntity>,
    manager: TransactionManager = this.repository.manager,
  ) {
    const result = await manager.update(LocationEntity, { number }, input);
    if (result.affected !== 0) {
      return this.findOneByLocationNumber(number, manager);
    } else {
      handleError(
        'Location not found',
        ErrorCode.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async findOneByLocationNumber(
    number: string,
    mamager: TransactionManager = this.repository.manager,
  ) {
    return mamager.findOne(LocationEntity, { where: { number } });
  }
}
