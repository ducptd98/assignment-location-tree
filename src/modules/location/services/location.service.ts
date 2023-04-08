import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories/location.repository';

@Injectable()
export class LocationService {
  constructor(private _locationRepository: LocationRepository) {}
}
