import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationV2Dto } from '../dto/create-location-v2.dto';
import { UpdateLocationV2Dto } from '../dto/update-location-v2.dto';
import { Pagination } from '../../../shared/interfaces/pagination-response.interface';
import { LocationTreeRepository } from '../repositories/location-tree.repository';
import { LocationV2Entity } from '../entities/location-v2.entity';
import { handleError } from '../../../shared/errors/handler-error';
import { ErrorCode } from '../../../shared/errors/error-code.enum';

@Injectable()
export class LocationV2Service {
  private readonly _defaultSeparatorFromDb = '.';
  private readonly _defaultSeparator = '-';
  constructor(private _locationRepository: LocationTreeRepository) {}

  public async getAll(): Promise<Pagination<LocationV2Entity>> {
    const [locations, total] = await this._locationRepository.getAll();
    const mapIdAndCode = new Map<string, string>(
      locations.map((item) => [item.id, item.code]),
    );

    const result = locations.map((location) => {
      const path = location.path;
      delete location.path;
      const number = path
        ? path
            .split(this._defaultSeparatorFromDb)
            .filter((id) => !!id)
            .map((id) => mapIdAndCode.get(id))
            .join(this._defaultSeparator)
        : null;
      return {
        ...location,
        number: number ? `${location.building}-${number}` : null,
      };
    });
    return {
      items: result,
      total,
    };
  }

  public async createOne(
    input: CreateLocationV2Dto,
  ): Promise<LocationV2Entity> {
    let parent: LocationV2Entity;
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
    input: UpdateLocationV2Dto,
  ): Promise<LocationV2Entity> {
    const toUpdateObject: Partial<LocationV2Entity> = { ...input };
    await this._getAndValidate(id);
    return this._locationRepository.update(id, toUpdateObject);
  }

  public async deleteOne(id: string): Promise<LocationV2Entity> {
    const location = await this._getAndValidate(id);
    await this._locationRepository.remove(location.id);
    return location;
  }

  private async _getAndValidate(id: string): Promise<LocationV2Entity> {
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
}
