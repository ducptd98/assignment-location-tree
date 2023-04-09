import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { LocationEntity } from '../entities/location.entity';
import { BaseRepository } from '../../../shared/repositories/base.repository';

@Injectable()
export class LocationRepository extends BaseRepository<LocationEntity> {
  private readonly _alias: string = 'location';
  constructor(
    @InjectRepository(LocationEntity)
    private _treeRepository: TreeRepository<LocationEntity>,
    @InjectRepository(LocationEntity)
    protected _repository: Repository<LocationEntity>,
  ) {
    super(_repository);
  }

  public async getAll(): Promise<[LocationEntity[], number]> {
    const query = this._repository
      .createQueryBuilder(this._alias)
      .select(
        ['id', 'path', 'name', 'code', 'area', 'building'].map(
          (field) => `${this._alias}.${field}`,
        ),
      );
    return query.getManyAndCount();
  }

  public async getTrees(): Promise<LocationEntity[]> {
    return this._treeRepository.findTrees();
  }

  public async updateOne(
    id: string,
    input: Partial<LocationEntity>,
  ): Promise<LocationEntity> {
    return this._repository.save({
      id,
      ...input,
    });
  }

  public async remove(id: string) {
    // Delete all descendant
    return this._repository.delete({
      id,
    });
  }
}
