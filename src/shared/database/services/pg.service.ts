import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentService } from '../../environment/environment.service';
import { PgConstants } from '../constants/pg.constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PgService {
  constructor(private readonly environmentService: EnvironmentService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getTypeOrmConfig(config?: { entities: any[] }): TypeOrmModuleOptions {
    const connection = {
      host: this.environmentService.getKey(PgConstants.POSTGRES_HOST),
      port: parseInt(this.environmentService.getKey(PgConstants.POSTGRES_PORT)),
      username: this.environmentService.getKey(PgConstants.POSTGRES_USER),
      password: this.environmentService.getKey(PgConstants.POSTGRES_PASSWORD),
      database: this.environmentService.getKey(PgConstants.POSTGRES_DATABASE),
    };

    return {
      type: PgConstants.POSTGRES,
      ...connection,

      entities: config?.entities || [PgConstants.TYPE_ORM_ENTITIES],

      migrationsTableName: PgConstants.TYPE_ORM_MIGRATION_TABLE_NAME,

      migrations: [PgConstants.TYPE_ORM_MIGRATIONS],
      extra: {
        max: 100,
      },
      synchronize: true,
      logging: this.environmentService.isDevMode(),
    } as TypeOrmModuleOptions;
  }
}
