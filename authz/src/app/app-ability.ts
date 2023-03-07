import { Ability, AbilityClass } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Subjects = 'Post' | 'User';

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
