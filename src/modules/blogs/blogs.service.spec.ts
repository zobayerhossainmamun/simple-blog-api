import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { getModelToken } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { createBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';

// Mock model for Blog
const mockBlogModel = {
  new: jest.fn().mockReturnThis(),
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
};

describe('BlogsService', () => {
  let service: BlogsService;
  let model: Model<Blog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getModelToken(Blog.name),
          useValue: mockBlogModel,
        },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    model = module.get<Model<Blog>>(getModelToken(Blog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new blog and return its ID', async () => {
      // Arrange
      const createBlogData: createBlogDto = {
        username: 'testUser',
        title: 'Test Blog',
        description: 'This is a test blog.',
      };

      // Mock the save method to return a mock blog object with an ID
      mockBlogModel.create.mockResolvedValue({
        _id: 'mockedId',
      });

      // Act
      const result = await service.create(createBlogData);
      expect(result).toEqual('mockedId');

      // Assert
      expect(model.create).toHaveBeenCalledWith({
        userName: createBlogData.username,
        title: createBlogData.title,
        description: createBlogData.description,
      });
    });

    it('should return blog list', async () => {
      const mockBlogs = [
        { _id: '1', userName: 'user1', title: 'Blog 1', description: 'Description 1' },
        { _id: '2', userName: 'user2', title: 'Blog 2', description: 'Description 2' },
      ];
      mockBlogModel.find.mockResolvedValue(mockBlogs);

      // Act
      const result = await service.getList();

      // Assert
      expect(mockBlogModel.find).toHaveBeenCalled(); // Check if find was called
      expect(result).toEqual(mockBlogs); // Verify the result
    });
  });
});
