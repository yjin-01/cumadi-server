import {
  Catch,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { GraphQLError, graphql } from 'graphql';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    console.log(exception);
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외 발생',
    };

    if (exception instanceof HttpException) {
      error.status = exception.getStatus();
      error.message = exception.message;
    } else if (exception instanceof AxiosError) {
      error.status = exception.response.status;
      error.message = exception.response.data.message;
    }

    console.log('============');
    console.log('예외가 발생했어요!');
    console.log('예외내용: ', error.message);
    console.log('예외코드: ', error.status);
    console.log('============');

    throw new GraphQLError(error.message, {
      extensions: { code: error.status },
    });
  }
}
