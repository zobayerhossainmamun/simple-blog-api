import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { setupSwagger } from './common/swagger';
import { ConfigService } from '@nestjs/config';

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

  const port = configService.get('PORT');

  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}
bootstrap();
