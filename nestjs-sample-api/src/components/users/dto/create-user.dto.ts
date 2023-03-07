/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRoleType } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$')
  @MinLength(8)
  password: string;

  @IsString()
  role: UserRoleType;
}
