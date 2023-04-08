import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories/location.repository';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Pagination } from '../../../shared/interfaces/pagination-response.interface';
import { LocationEntity } from '../entities/location.entity';

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
    return this._locationRepository.save(input);
  }

  public async updateOne(id: string, input: UpdateLocationDto) {
    return this._locationRepository.update(id, input);
  }

  public async deleteOne(id: string) {
    return this._locationRepository.delete(id);
  }
}
