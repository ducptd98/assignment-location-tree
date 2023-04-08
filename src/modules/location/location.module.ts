import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../../shared/environment/environment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { LocationService } from './services/location.service';
import { LocationRepository } from './repositories/location.repository';
import { LocationController } from './controllers/location.controller';
import { WinstonModule } from '../../shared/winston/winston.module';

@Module({
  imports: [
    EnvironmentModule,
    WinstonModule,
    TypeOrmModule.forFeature([LocationEntity]),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
  exports: [LocationService, LocationRepository],
})
export class LocationModule {}
