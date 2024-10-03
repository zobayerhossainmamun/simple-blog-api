import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createBlogDto } from './dto/create-blog.dto';
import { BlogsService } from './blogs.service';
import { createBlogResponse, getBlogListResponse } from './interfaces/blog-response.interface';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogsService) { }

    @Post()
    async create(@Body() data: createBlogDto): Promise<createBlogResponse> {
        const blogId = await this.blogService.create(data);
        return {
            message: 'Blog has been created.',
            blogId
        };
    }

    @Get('list')
    async getList(): Promise<getBlogListResponse>{
        const result = await this.blogService.getList();
        return {
            message: 'Blog List',
            blogList: result
        }
    }
}
