import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule.js';
import cookieParser from 'cookie-parser';
import { ServerEnv } from '@acme/server-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser);

  if (ServerEnv.Server.CORS.enabled) {
    app.enableCors({
      origin: ServerEnv.Server.CORS.origin,
    })
  }
  
  await app.listen(3000);
}
bootstrap();