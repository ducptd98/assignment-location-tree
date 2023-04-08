import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  building: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: 'number',
  })
  area: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  number: string;
}
