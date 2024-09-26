import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';




async function bootstrap() { //this start the project

  const httpsOptions = {
    key: fs.readFileSync( __dirname + '../../server.key'),
    cert: fs.readFileSync(__dirname + '../../server.cert'),
  };

  const app = await NestFactory.create(AppModule,
    {bufferLogs:true, httpsOptions}
  );
  app.useLogger(app.get(MyLoggerService))
  app.enableCors()
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
