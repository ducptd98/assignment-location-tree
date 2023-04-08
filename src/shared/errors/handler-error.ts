import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export const handleError = (
  message: string,
  errorCode: ErrorCode,
  httpStatusCode: HttpStatus,
): void => {
  throw new HttpException(
    {
      message: message,
      errorCode: errorCode,
      status: httpStatusCode,
    },
    httpStatusCode,
  );
};
