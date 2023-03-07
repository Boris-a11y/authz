/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { User } from 'src/components/users/entities/user.entity';
import { Post } from 'src/components/posts/entities/post.entity';

export class UserRepository extends Repository<User> {}
export class PostRepository extends Repository<Post> {}
