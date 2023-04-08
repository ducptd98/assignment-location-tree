import { Module } from '@nestjs/common';
import {
  WinstonModule as BaseWinstonModule,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { WinstonConstants } from './constants/winston.constant';
import { EnvironmentService } from '../environment/environment.service';
import { EnvironmentModule } from '../environment/environment.module';

@Module({
  imports: [
    BaseWinstonModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: async (environmentService: EnvironmentService) => {
        // Create the log directory if it does not exist
        const transports =
          environmentService.isProductionMode() ||
          environmentService.isStagingMode()
            ? [
                new winston.transports.DailyRotateFile({
                  filename:
                    environmentService.getKey(
                      WinstonConstants.WINSTON_LOG_ERROR_FILE_NAME,
                    ) || 'error-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                  zippedArchive: true,
                  maxSize: '20m',
                  level: 'error',
                }),
                new winston.transports.DailyRotateFile({
                  filename:
                    environmentService.getKey(
                      WinstonConstants.WINSTON_LOG_FILE_NAME,
                    ) || 'application-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                  zippedArchive: true,
                  maxSize: '20m',
                }),
              ]
            : [
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
              ];
        const options: WinstonModuleOptions = {
          level: 'info',
          format: winston.format.json(),
          transports,
        };
        return options;
      },
      inject: [EnvironmentService],
    }),
  ],
})
export class WinstonModule {}
