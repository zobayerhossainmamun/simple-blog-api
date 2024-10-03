import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/common/modules/database.module';
import { Blog, BlogSchema } from './entities/blog.entity';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule { }
