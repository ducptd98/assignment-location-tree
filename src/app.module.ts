import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PgModule } from './shared/database/pg.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    PgModule.registerAsync({
      entities: [],
    }),
    LocationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
