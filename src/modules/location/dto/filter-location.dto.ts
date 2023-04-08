import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterLocationDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
  })
  @Transform(({ value }) => (value ? Boolean(value) : undefined))
  isGroup: boolean;
}
