import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule.js';
import cookieParser from 'cookie-parser';
import { ServerEnv } from '@acme/server-env';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  })

  if (ServerEnv.Server.CORS.enabled) {
    console.debug(`CORS ENABLED`, ServerEnv.Server.CORS.origin)
    app.enableCors({
      origin: ServerEnv.Server.CORS.origin,
    })
  }

  await app.listen(3000);
}
bootstrap();