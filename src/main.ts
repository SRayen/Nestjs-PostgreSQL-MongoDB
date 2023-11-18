import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      //ValidationPipe will implicitly convert primitive types to the types that are defined in your DTOs
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger
  //RQ:Don't forget to add swagger plugin in nest-cli.json
  const options = new DocumentBuilder()
    .setTitle('IluvCoffee API ')
    .setDescription('Coffee Application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //Write Swagger JSON File
  const swaggerJson = JSON.stringify(document, null, 2);
  const filePath = './exported-swagger.json';

  fs.writeFileSync(filePath, swaggerJson);
  console.log(`Swagger JSON exported to ${filePath}`);

  await app.listen(3000);
}
bootstrap();
