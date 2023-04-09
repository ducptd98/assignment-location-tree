import {
  Column,
  Entity,
  JoinColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('location')
@Tree('materialized-path')
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
    name: 'code',
    type: 'varchar',
  })
  code: string;

  @Column({
    name: 'area',
    type: 'real',
  })
  area: number;

  @Column({
    name: 'parent_id',
    type: 'uuid',
    nullable: true,
  })
  parentId: string;

  @Column({
    type: 'varchar',
    name: 'mpath',
    update: false,
    insert: false,
  })
  path: string;

  @TreeParent({ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: LocationEntity;

  @TreeChildren()
  children: LocationEntity[];
}
