import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PgService } from './services/pg.service';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

@Module({})
export class PgModule {
  static registerAsync(config: {
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
          useFactory: (environmentService: EnvironmentService) => {
            const pgService = new PgService(environmentService);
            const configTypeorm = pgService.getTypeOrmConfig({
              entities: config.entities,
            });

            return {
              ...configTypeorm,
              autoLoadEntities: true,
            } as TypeOrmModuleOptions;
          },
          inject: [EnvironmentService],
        }),
      ],
    };
  }
}
