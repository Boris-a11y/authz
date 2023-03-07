/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthenticationGuard from '../auth/guards/jwtAuthGuard';
import { Action } from '../ability/actions/Action';
import { Post as PostEntity } from './entities/post.entity';
import { checkAbilities } from '../ability/ability.factory/ability.decorator';
import { AbilitiesGuard } from '../ability/ability.factory/abilities.guard';

@UseGuards(JwtAuthenticationGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @checkAbilities({ action: Action.Create, subject: PostEntity })
  @UseGuards(AbilitiesGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseGuards(AbilitiesGuard)
  @checkAbilities({ action: Action.Read, subject: PostEntity })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards(AbilitiesGuard)
  @checkAbilities({ action: Action.Read, subject: PostEntity })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AbilitiesGuard)
  @checkAbilities({ action: Action.Update, subject: PostEntity })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AbilitiesGuard)
  @checkAbilities({ action: Action.Delete, subject: PostEntity })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
