import { OmitType } from '@nestjs/swagger';
import { UpdateLocationDto } from './update-location.dto';

export class UpdateLocationByLocationNumberDto extends OmitType(
  UpdateLocationDto,
  ['number'],
) {}
