import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { LocationV2Entity } from '../entities/location-v2.entity';
import { BaseRepository } from '../../../shared/repositories/base.repository';

@Injectable()
export class LocationTreeRepository extends BaseRepository<LocationV2Entity> {
  private readonly _alias: string = 'location';
  constructor(
    @InjectRepository(LocationV2Entity)
    private _treeRepository: TreeRepository<LocationV2Entity>,
    @InjectRepository(LocationV2Entity)
    protected _repository: Repository<LocationV2Entity>,
  ) {
    super(_repository);
  }

  public async getAll(): Promise<[LocationV2Entity[], number]> {
    const query = this._repository
      .createQueryBuilder(this._alias)
      .select(
        ['id', 'path', 'name', 'code', 'area', 'building'].map(
          (field) => `${this._alias}.${field}`,
        ),
      );
    return query.getManyAndCount();
  }

  public async getTrees() {
    return await Promise.all([
      this._treeRepository.findTrees(),
      this._treeRepository.count(),
    ]);
  }

  public async remove(id: string) {
    // Delete all descendant
    return this._repository.delete({
      id,
    });
  }
}
