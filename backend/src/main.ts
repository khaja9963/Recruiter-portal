import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS for frontend
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    })
  );

  // Swagger OpenAPI Docs
  const config = new DocumentBuilder()
    .setTitle('Clyptus Job Portal API — Recruiter Services')
    .setDescription('Enterprise ATS & Recruitment backend endpoints for the Recruiter role.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Clyptus Job Portal Recruiter Backend running on http://127.0.0.1:${port}/api/v1`);
  console.log(`📚 Swagger API Documentation available on http://127.0.0.1:${port}/api/docs`);
}

bootstrap();
