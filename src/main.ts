import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors();

  app.enableCors({ credentials: true, origin: '*', allowedHeaders: '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.port);
}

bootstrap();
