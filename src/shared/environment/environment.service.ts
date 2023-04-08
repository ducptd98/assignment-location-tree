import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import fs from 'fs';
import { EnvironmentConstants } from './constants/environment.constant';

@Injectable()
export class EnvironmentService {
  private readonly settings: { [key: string]: string };

  constructor() {
    this.settings = dotenv.parse(
      fs.readFileSync(
        this.isDevMode()
          ? EnvironmentConstants.DEV_ENV_CONFIG_PATH
          : EnvironmentConstants.ENV_CONFIG_PATH,
      ),
    );

    if (this.isProductionMode() || this.isStagingMode()) {
      for (const key in this.settings) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.settings.hasOwnProperty(key) && process.env[key]) {
          this.settings[key] = process.env[key];
        }
      }
    }
  }

  public getKey(key: string): string {
    return this.settings[key];
  }

  public isDevMode(): boolean {
    return !(this.isProductionMode() || this.isStagingMode());
  }

  public isProductionMode(): boolean {
    return process.env.NODE_ENV === EnvironmentConstants.PRODUCTION_ENV;
  }

  public isStagingMode(): boolean {
    return process.env.NODE_ENV === EnvironmentConstants.STAGING_ENV;
  }

  public isTestMode(): boolean {
    return process.env.NODE_ENV === EnvironmentConstants.TEST_ENV;
  }
}
