import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('location')
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
    type: 'ltree',
  })
  number: string;

  @Column({
    name: 'area',
    type: 'real',
  })
  area: number;
}
