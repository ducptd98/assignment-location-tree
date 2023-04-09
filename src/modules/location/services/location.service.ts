import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Pagination } from '../../../shared/interfaces/pagination-response.interface';
import { LocationRepository } from '../repositories/location.repository';
import { LocationEntity } from '../entities/location.entity';
import { handleError } from '../../../shared/errors/handler-error';
import { ErrorCode } from '../../../shared/errors/error-code.enum';
import { LocationDto } from '../dto/location.dto';

@Injectable()
export class LocationService {
  private readonly _defaultSeparatorFromDb = '.'; // Default separator for materialized path
  private readonly _defaultSeparator = '-';
  constructor(private _locationRepository: LocationRepository) {}

  public async getAll(): Promise<Pagination<LocationDto>> {
    const items = await this._locationRepository.getTrees();
    const [locations, total] = await this._locationRepository.getAll();
    const mapIdAndCode = new Map<string, string>(
      locations.map((item) => [item.id, item.code]),
    );

    const result = locations.map((location) => {
      const path = location.path;
      delete location.path;
      const number = path
        ? this._mapToLocationNumber(path, mapIdAndCode)
        : null;
      return {
        ...location,
        number: number ? `${location.building}-${number}` : null,
      } as LocationDto;
    });
    return {
      items: result,
      total,
    };
  }

  public async createOne(input: CreateLocationDto): Promise<LocationEntity> {
    let parent: LocationEntity;
    if (input.parentId) {
      parent = await this._getAndValidate(input.parentId);
    }
    return this._locationRepository.save({
      ...input,
      ...(parent ? { parent } : null),
    });
  }

  public async updateOneById(
    id: string,
    input: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const toUpdateObject: Partial<LocationEntity> = { ...input };
    await this._getAndValidate(id);
    let parent: LocationEntity;
    if (input.parentId) {
      parent = await this._getAndValidate(input.parentId);
    }
    return this._locationRepository.updateOne(id, {
      ...toUpdateObject,
      ...(parent ? { parent } : null),
    });
  }

  public async deleteOne(id: string): Promise<LocationEntity> {
    const location = await this._getAndValidate(id);
    await this._locationRepository.remove(location.id);
    return location;
  }

  private async _getAndValidate(id: string): Promise<LocationEntity> {
    const location = await this._locationRepository.findById(id);
    if (!location) {
      handleError(
        'Location not found',
        ErrorCode.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
      return;
    }
    return location;
  }

  private _mapToLocationNumber(
    path: string,
    mapIdAndCode: Map<string, string>,
  ) {
    return path
      .split(this._defaultSeparatorFromDb)
      .filter((id) => !!id)
      .map((id) => mapIdAndCode.get(id))
      .join(this._defaultSeparator);
  }
}
