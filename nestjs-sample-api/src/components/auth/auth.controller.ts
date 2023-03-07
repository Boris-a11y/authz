/* eslint-disable prettier/prettier */
import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthenticationGuard } from './guards/localAuth.guard';
import { RequestWithUser } from './interface/userRequest';
import { Get, Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  auth(@Req() request: RequestWithUser) {
    const user = request.user;
    const { password, ...rest } = user;
    return rest;
  }

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.createJwtToken(user.id);

    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @Post('logout')
  async logOut(@Req() _: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.logout());
    return response.sendStatus(200);
  }
}
