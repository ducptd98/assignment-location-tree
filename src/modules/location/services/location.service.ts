import { HttpStatus, Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories/location.repository';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Pagination } from '../../../shared/interfaces/pagination-response.interface';
import { LocationEntity } from '../entities/location.entity';
import { handleError } from '../../../shared/errors/handler-error';
import { ErrorCode } from '../../../shared/errors/error-code.enum';
import { UpdateLocationByLocationNumberDto } from '../dto/update-location-by-location-number.dto';
import { FilterLocationDto } from '../dto/filter-location.dto';

@Injectable()
export class LocationService {
  constructor(private _locationRepository: LocationRepository) {}

  public async getAll(
    filter: FilterLocationDto,
  ): Promise<Pagination<LocationEntity>> {
    const [items, total] = await this._locationRepository.findAndCount();
    if (filter?.isGroup) {
      const results = items;
      return {
        items: results,
        total,
      };
    }
    return {
      items,
      total,
    };
  }

  public async createOne(input: CreateLocationDto): Promise<LocationEntity> {
    const path = input.number.replace(/-/g, '.');
    await this._validateExistLocationNumber(input);
    return this._locationRepository.save({
      ...input,
      path,
    });
  }

  public async updateOneById(
    id: string,
    input: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const toUpdateObject: Partial<LocationEntity> = { ...input };
    const location = await this._getAndValidate(id);
    if (toUpdateObject.number && toUpdateObject.number != location.number) {
      await this._validateExistLocationNumber(input);
      toUpdateObject.path = input.number.replace(/-/g, '.');
    }

    return this._locationRepository.update(id, toUpdateObject);
  }

  public async updateOneByNumber(
    number: string,
    input: UpdateLocationByLocationNumberDto,
  ): Promise<LocationEntity> {
    return this._locationRepository.updateOneByLocationNumber(number, input);
  }

  public async deleteOne(id: string): Promise<LocationEntity> {
    const location = await this._getAndValidate(id);
    await this._locationRepository.removeByLocationNumber(location.path);
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

  private async _validateExistLocationNumber(input: CreateLocationDto) {
    const countLocationNumber =
      await this._locationRepository.countByLocationNumber(input.number);
    if (countLocationNumber > 0) {
      handleError(
        'Exist location number',
        ErrorCode.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
