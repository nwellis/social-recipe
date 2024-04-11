import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule.js';
import cookieParser from 'cookie-parser';
import { ServerEnv } from '@acme/server-env';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  if (ServerEnv.Server.CORS.enabled) {
    console.debug(`CORS ENABLED`, ServerEnv.Server.CORS.origin)
    app.enableCors({
      origin: ServerEnv.Server.CORS.origin,
    })
  }

  await app.listen(3000);
}
bootstrap();