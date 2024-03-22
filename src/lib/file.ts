import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import { AllExceptionsFilter } from './AllExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useBodyParser('json');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Warehouse')
    .setDescription('this is v1')
    .setVersion('1.0.0')
    .addTag('Your API Tag ok')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(7777, () => {
    console.log(`http://localhost:${7777}`);
    console.log(`http://localhost:${7777}/docs`);
  });
}
bootstrap();
