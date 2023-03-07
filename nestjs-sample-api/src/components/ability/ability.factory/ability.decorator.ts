/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common/';
import { Subjects } from './ability.factory';
import { Action } from '../actions/Action';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';
export const checkAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
