import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PgModule } from './shared/database/pg.module';
import { LocationModule } from './modules/location/location.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { LocationV2Module } from './modules/location-v2/location-v2.module';

@Module({
  imports: [
    PgModule.registerAsync({
      entities: [],
    }),
    LocationModule,
    LocationV2Module,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
