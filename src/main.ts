import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded ,static as expressStatic} from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  console.log( process.env.PORT);
  console.log(process.env.dbPort,'-')
  const PORT = process.env.PORT || 3001; // Default to 3000 if not set in .env
  const USE_SSL = process.env.USE_SSL === 'true'; // Check if SSL is enabled

  let app;

  // If SSL is enabled, configure HTTPS options
  if (USE_SSL) {
    const httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/backend.gymitfitness.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/backend.gymitfitness.com/fullchain.pem'),
    };

    app = await NestFactory.create(AppModule, { httpsOptions });
    console.log(`Server running on HTTPS at https://backend.gymitfitness.com:${PORT}`);
  } else {
    app = await NestFactory.create(AppModule);
    console.log(`Server running on HTTP at http://backend.gymitfitness.com:${PORT}`);
  }

  // Enable global CORS
  app.enableCors({ credentials: true, origin: '*', allowedHeaders: '*' });
  
  // Set global API prefix
  app.setGlobalPrefix('api/v1');

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Set up body parsers with a larger limit for JSON and URL encoded data
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use('/uploads', expressStatic('uploads')); 


  // Start the application
  await app.listen(PORT);
}

bootstrap();
