import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      '*', //
      'http://localhost:3000',
      'http://localhost:5500',
    ],
    credentials: true,
  });
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
