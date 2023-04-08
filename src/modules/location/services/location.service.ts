import { HttpStatus, Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories/location.repository';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Pagination } from '../../../shared/interfaces/pagination-response.interface';
import { LocationEntity } from '../entities/location.entity';
import { handleError } from '../../../shared/errors/handler-error';
import { ErrorCode } from '../../../shared/errors/error-code.enum';
import { UpdateLocationByLocationNumberDto } from '../dto/update-location-by-location-number.dto';

@Injectable()
export class LocationService {
  constructor(private _locationRepository: LocationRepository) {}

  public async getAll(): Promise<Pagination<LocationEntity>> {
    const [items, total] = await this._locationRepository.findAndCount();
    return {
      items,
      total,
    };
  }

  public async createOne(input: CreateLocationDto) {
    const path = input.number.replace(/-/g, '.');
    return this._locationRepository.save({
      ...input,
      path,
    });
  }

  public async updateOneById(id: string, input: UpdateLocationDto) {
    const toUpdateObject: Partial<LocationEntity> = { ...input };
    const location = await this._getAndValidate(id);
    if (toUpdateObject.number && toUpdateObject.number != location.number) {
      toUpdateObject.path = input.number.replace(/-/g, '.');
    }

    return this._locationRepository.update(id, toUpdateObject);
  }

  public async updateOneByNumber(
    number: string,
    input: UpdateLocationByLocationNumberDto,
  ) {
    return this._locationRepository.updateOneByLocationNumber(number, input);
  }

  public async deleteOne(id: string) {
    await this._getAndValidate(id);
    return this._locationRepository.delete(id);
  }

  private async _getAndValidate(id: string) {
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
