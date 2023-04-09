import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationV2Dto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  @ValidateIf((_, value) => value !== undefined)
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
  @ValidateIf((_, value) => value !== undefined)
  area: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  @ValidateIf((_, value) => value !== undefined)
  code: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: 'string',
  })
  parentId: string;
}
