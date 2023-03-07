/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    const saltRounds = 15;
    const salt: string = await genSalt(saltRounds);

    return await hash(password, salt);
  }

  async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}
