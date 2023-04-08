import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorCode } from '../errors/error-code.enum';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    let processUuid = '';
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    processUuid = request['processUuid'] || '';
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(`Error process '${processUuid}': ${error.message}`);
        this.logger.error(error.stack);
        if (error instanceof HttpException) {
          return throwError(() => error);
        } else {
          // Handle 500 error, built-in error
          return throwError(
            () =>
              new HttpException(
                {
                  message: error.message,
                  errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
      }),
    );
  }
}
