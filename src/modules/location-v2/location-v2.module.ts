import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../../shared/environment/environment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationV2Service } from './services/location-v2.service';
import { LocationV2Controller } from './controllers/location-v2.controller';
import { WinstonModule } from '../../shared/winston/winston.module';
import { LocationTreeRepository } from './repositories/location-tree.repository';
import { LocationV2Entity } from './entities/location-v2.entity';

@Module({
  imports: [
    EnvironmentModule,
    WinstonModule,
    TypeOrmModule.forFeature([LocationV2Entity]),
  ],
  controllers: [LocationV2Controller],
  providers: [LocationV2Service, LocationTreeRepository],
  exports: [LocationV2Service, LocationTreeRepository],
})
export class LocationV2Module {}
