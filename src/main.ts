import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionCustomFilter } from './common/exceptions/rpc-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    credentials: true
  });
  
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true
    }
  ));

  app.useGlobalFilters(new ExceptionCustomFilter());

  await app.listen(3000);
}
bootstrap();
