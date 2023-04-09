import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationV2Dto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  building: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  name: string;

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
  code: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: 'string',
  })
  parentId: string;
}
