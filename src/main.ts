import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { //this start the project
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix("api")
  await app.listen(3000);
}
bootstrap();
