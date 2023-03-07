/* eslint-disable prettier/prettier */
import { Post } from 'src/components/posts/entities/post.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from 'src/components/ability/ability.factory/ability.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  const mockedPostsService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Post]), AbilityModule],
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockedPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', () => {
    expect(
      controller.create({
        title: 'My title',
        description: 'My description',
      }),
    ).toEqual({
      id: expect.any(Number),
      title: 'My title',
      description: 'My description',
    });
  });
});
