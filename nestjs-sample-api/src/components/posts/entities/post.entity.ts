/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../entity/AbstractEntity';

@Entity()
export class Post extends AbstractEntity {
  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;
}
