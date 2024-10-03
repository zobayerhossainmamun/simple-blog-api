import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './common/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationExceptionFilter } from './common/validation/exception.filter';
import { ValidationException } from './common/validation/validation-exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors();

  // Enable application versioning
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });

  // Set global prefix for url
  app.setGlobalPrefix('/api');

  // Setup Swagger for documentation.
  setupSwagger(app);

  // Exception filter
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new ValidationException(errors);
    }
  }));

  const port = configService.get('PORT');

  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}
bootstrap();
