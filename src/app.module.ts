import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PgModule } from './shared/database/pg.module';

@Module({
  imports: [
    PgModule.registerAsync({
      entities: [],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
