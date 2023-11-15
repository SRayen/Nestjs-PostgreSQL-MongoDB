import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

//RQ:We want to process all exceptions that are instances of HttpException => we should pass it in ():
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const request = ctx.getRequest<Request>();

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
