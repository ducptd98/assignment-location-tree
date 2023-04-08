import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('location')
@Index('path_unique', ['path'], { unique: true })
@Index('number_unique', ['number'], { unique: true })
export class LocationEntity extends BaseEntity {
  @Column({
    name: 'building',
    type: 'varchar',
  })
  building: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'number',
    type: 'varchar',
  })
  number: string;

  @Column({
    name: 'area',
    type: 'real',
  })
  area: number;

  @Column({
    name: 'path',
    type: 'ltree',
  })
  path: string;
}
