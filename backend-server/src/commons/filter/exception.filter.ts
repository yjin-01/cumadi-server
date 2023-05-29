import {
  Catch,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { GraphQLError } from 'graphql';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외 발생',
    };

    if (exception instanceof NotFoundException) {
      error.status = 404;
      error.message = '잘못된 페이지 요청';
    } else if (exception instanceof HttpException) {
      error.status = exception.getStatus();
      error.message = exception.message;

      throw new GraphQLError(error.message, {
        extensions: { code: error.status },
      });
    } else if (exception instanceof AxiosError) {
      error.status = exception.response.status;
      error.message = exception.response.data.message;

      throw new GraphQLError(error.message, {
        extensions: { code: error.status },
      });
    }

    console.log('============');
    console.log('예외가 발생했어요!');
    console.log('예외내용: ', error.message);
    console.log('예외코드: ', error.status);
    console.log('============');
  }
}
