import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './common/config/app.config';
import { validate } from './common/validation/env.validation';
import databaseConfig from './common/config/database.config';
import swaggerConfig from './common/config/swagger.config';
import { DatabaseModule } from './common/modules/database.module';
import { BlogsModule } from './modules/blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, swaggerConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      validate,
    }),
    DatabaseModule,
    BlogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
