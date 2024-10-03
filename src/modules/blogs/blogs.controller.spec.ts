import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { createBlogDto } from './dto/create-blog.dto';
import { createBlogResponse } from './interfaces/blog-response.interface';

describe('BlogsController', () => {
  let controller: BlogsController;
  let service: BlogsService;

  const mockBlogsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogsService,
          useValue: mockBlogsService,
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    service = module.get<BlogsService>(BlogsService);
  });

  it('should create a blog and return a response', async () => {
    const createBlogData: createBlogDto = {
      username: 'testuser',
      title: 'Test Blog',
      description: 'This is a test blog.',
    };

    const mockBlogId = '12345';
    mockBlogsService.create.mockResolvedValue(mockBlogId);

    const expectedResponse: createBlogResponse = {
      message: 'Blog has been created.',
      blogId: mockBlogId,
    };

    const result = await controller.create(createBlogData);

    expect(result).toEqual(expectedResponse); // Expecting the response to match the expected response
    expect(service.create).toHaveBeenCalledWith(createBlogData); // Check if the service was called with the correct data
  });
});
