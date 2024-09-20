import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      // Handle HTTP-specific exceptions
      const status = exception.getStatus();
      const message = exception.message;

      response.status(status).json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      // Handle generic exceptions
      response.status(500).json({
        statusCode: 500,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
