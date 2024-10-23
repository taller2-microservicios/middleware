import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionCustomFilter } from './common/exceptions/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new ExceptionCustomFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
