/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from '../../repositories/repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: PostRepository,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<CreatePostDto & Post> {
    return await this.postRepository.save(createPostDto);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }
}
