import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { createBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) { }

    async create(data: createBlogDto): Promise<string> {
        const newBlog = await this.blogModel.create({
            userName: data.username,
            title: data.title,
            description: data.description
        });
        return newBlog._id.toString();
    }

    async getList(): Promise<Blog[]> {
        return await this.blogModel.find();
    }
}
