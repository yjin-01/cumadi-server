import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { CustomExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      '*', //
      'http://localhost:3000',
      'http://localhost:5500',
      'http://cumadi.site',
      'https://cumadi.site',
      'https://cumadi-deploy-4i72.vercel.app',
    ],
    credentials: true,
  });
  app.use(graphqlUploadExpress());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
