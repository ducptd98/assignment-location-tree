import { Controller } from '@nestjs/common';
import { LocationService } from '../services/location.service';

@Controller('location')
export class LocationController {
  constructor(private _locationService: LocationService) {}
}
