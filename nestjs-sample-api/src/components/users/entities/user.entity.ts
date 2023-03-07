/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../entity/AbstractEntity';

export type UserRoleType = 'admin' | 'editor' | 'visitor';

@Entity()
export class User extends AbstractEntity {
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @Column({
    type: 'text',
    enum: ['admin', 'editor', 'visitor'],
    default: 'visitor',
  })
  role: UserRoleType;
}
