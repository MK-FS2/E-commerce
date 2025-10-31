import {ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus,} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class CustomException implements ExceptionFilter 
{
  catch(exception: unknown, host: ArgumentsHost) 
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = 
    {
      statusCode: status,
      path: request.url,
      stack: exception instanceof Error ? exception.stack : undefined,
      message: exception instanceof HttpException ? exception.getResponse() : exception instanceof Error ? exception.message : 'Internal server error',
    };
    response.status(status).json(errorResponse);
  }
}
