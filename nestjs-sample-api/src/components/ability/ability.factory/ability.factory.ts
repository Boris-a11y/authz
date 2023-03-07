import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Post } from 'src/components/posts/entities/post.entity';
import { User } from 'src/components/users/entities/user.entity';
import { Action } from '../actions/Action';

export type Subjects = InferSubjects<typeof Post | 'all'>;
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    const { role } = user;

    if (role === 'admin') {
      can(Action.Manage, 'all');
    } else if (role === 'editor') {
      can([Action.Read, Action.Create], Post);
    } else {
      can(Action.Read, Post);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
