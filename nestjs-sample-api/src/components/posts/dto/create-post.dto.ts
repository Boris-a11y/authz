/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(5, 20)
  title: string;

  description: string;
}
