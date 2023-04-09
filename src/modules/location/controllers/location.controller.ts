import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { LocationDto } from '../dto/location.dto';

@Controller('v1/locations')
@ApiTags('Location')
export class LocationController {
  constructor(private _locationService: LocationService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok', type: PaginationDto })
  async getAll() {
    return this._locationService.getAll();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Ok', type: LocationDto })
  async createOne(@Body() input: CreateLocationDto) {
    return this._locationService.createOne(input);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ok', type: LocationDto })
  async updateOne(@Param('id') id: string, @Body() input: UpdateLocationDto) {
    return this._locationService.updateOneById(id, input);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ok', type: LocationDto })
  async deleteOne(@Param('id') id: string) {
    return this._locationService.deleteOne(id);
  }
}
