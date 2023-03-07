/* eslint-disable prettier/prettier */
import { Request } from 'express';
import { User } from 'src/components/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
