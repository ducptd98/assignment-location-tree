import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiProperty({
    name: 'items',
    isArray: true,
  })
  items: T[];

  @ApiProperty({
    name: 'total',
    type: 'number',
  })
  total: number;
}
