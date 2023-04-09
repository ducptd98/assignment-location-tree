import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationV2Service } from '../services/location-v2.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { CreateLocationV2Dto } from '../dto/create-location-v2.dto';
import { UpdateLocationV2Dto } from '../dto/update-location-v2.dto';
import { LocationV2Dto } from '../dto/location-v2.dto';

@Controller('v2/locations')
@ApiTags('Location v2')
export class LocationV2Controller {
  constructor(private _locationService: LocationV2Service) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok', type: PaginationDto })
  async getAll() {
    return this._locationService.getAll();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Ok', type: LocationV2Dto })
  async createOne(@Body() input: CreateLocationV2Dto) {
    return this._locationService.createOne(input);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ok', type: LocationV2Dto })
  async updateOne(@Param('id') id: string, @Body() input: UpdateLocationV2Dto) {
    return this._locationService.updateOneById(id, input);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ok', type: LocationV2Dto })
  async deleteOne(@Param('id') id: string) {
    return this._locationService.deleteOne(id);
  }
}
