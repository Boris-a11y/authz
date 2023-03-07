/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from '../users/hash.service';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './interface/payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: CreateUserDto) {
    try {
      const createdUser = await this.userService.register({
        ...registrationData,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(username: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByUsername(username);
      const matching = await this.hashService.comparePassword(
        plainTextPassword,
        user.password,
      );

      if (!matching) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      } else {
        return user;
      }
    } catch (error) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
  }

  public createJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public logout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
