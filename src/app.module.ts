import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PgModule } from './shared/database/pg.module';
import { LocationModule } from './modules/location/location.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

@Module({
  imports: [
    PgModule.registerAsync({
      entities: [],
    }),
    LocationModule,
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
