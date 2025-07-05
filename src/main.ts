import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT') || 3001;
  const USE_SSL = configService.get('USE_SSL') === 'true';

  // HTTPS mode
  if (USE_SSL) {
    const httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/backend.gymitfitness.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/backend.gymitfitness.com/fullchain.pem'),
    };
    const appHttps = await NestFactory.create(AppModule, { httpsOptions });
    await appHttps.listen(PORT);
    console.log(`Server running on HTTPS at https://backend.gymitfitness.com:${PORT}`);
    return;
  }

  // HTTP mode
  app.enableCors({ credentials: true, origin: '*', allowedHeaders: '*' });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(PORT);
  console.log(`Server running on HTTP at http://backend.gymitfitness.com:${PORT}`);
}
bootstrap();
