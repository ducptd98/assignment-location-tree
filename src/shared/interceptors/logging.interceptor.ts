import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 } from 'uuid';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const processUuid = v4();
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    request['processUuid'] = processUuid;
    const handler = context.getHandler();
    this.logger.log(
      `Start process '${processUuid}' » type: '${request.method}' » handler: '${
        handler.name
      }' at '${now}' input: ${JSON.stringify(request.body)}`,
    );
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Finished process '${processUuid}' » type: '${
              request.method
            }' » handler: '${handler.name}' after: '${Date.now() - now}ms'`,
          ),
        ),
      );
  }
}
