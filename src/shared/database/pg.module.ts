import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PgService } from './services/pg.service';
import { EnvironmentModule } from '../environment/environment.module';

@Module({})
export class PgModule {
  static register(config: {
    entities: any[];
    synchronize?: boolean;
  }): DynamicModule {
    if (typeof config.synchronize !== 'boolean') {
      config.synchronize = true;
    }
    return {
      module: PgModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [EnvironmentModule],
          useFactory: async (pgService: PgService) =>
            ({
              ...pgService.getTypeOrmConfig({ entities: config.entities }),
              autoLoadEntities: true,
            } as TypeOrmModuleOptions),
          inject: [PgService],
        }),
      ],
    };
  }
}
