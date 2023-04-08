import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({
    type: 'string',
  })
  id: string | null;

  @ApiProperty({
    type: 'string',
  })
  building: string;

  @ApiProperty({
    type: 'number',
  })
  area: number;

  @ApiProperty({
    type: 'string',
  })
  number: string;
}
