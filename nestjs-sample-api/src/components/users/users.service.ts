/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repositories/repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { HashService } from './hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private hashService: HashService,
  ) {}

  async getByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async register(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    createUserDto.password = await this.hashService.hashPassword(
      createUserDto.password,
    );

    const user = await this.userRepository.save(createUserDto);
    return user;
  }
}
