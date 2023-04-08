import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';

@Injectable()
export class LocationRepository extends BaseRepository<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    protected repository: Repository<LocationEntity>,
  ) {
    super(repository);
  }
}
