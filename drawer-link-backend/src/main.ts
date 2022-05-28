import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { mockingData } from './common/mocking-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.enableCors();

  await app.listen(process.env.PORT || 1968);

  console.log('environement', process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'test') {
    await mockingData();
    console.log('DB op');
  }
}
bootstrap();
