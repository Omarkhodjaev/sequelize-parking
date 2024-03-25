import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './lib/AllExceptionFilter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from './common/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useBodyParser('json');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Parking in Sequelize')
    .setDescription('this is v1')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${config.serverPort}/`, 'Local environment')
    .addTag('Your API Tag ok')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.serverPort, () => {
    console.log(`http://localhost:${config.serverPort}`);
    console.log(`http://localhost:${config.serverPort}/docs`);
  });
}
bootstrap();
