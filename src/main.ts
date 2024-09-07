import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  // Set a global prefix for all routes
  app.setGlobalPrefix('vortextream');

  // Configure CORS

  app.enableCors();

  // Configure global pipes for validation and transformation

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('VortexStream API')
    .setDescription('API documentation for the VortexStream project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // Disable the models section for better readability
      docExpansion: 'none', // Minimize the operations by default
    },
  });

  await app.listen(process.env.PORT || 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Swagger is available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();
