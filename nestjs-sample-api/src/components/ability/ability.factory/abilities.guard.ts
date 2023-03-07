/* eslint-disable prettier/prettier */
import { ForbiddenError } from '@casl/ability';
import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import JwtAuthenticationGuard from 'src/components/auth/guards/jwtAuthGuard';
import { RequestWithUser } from 'src/components/auth/interface/userRequest';
import { CHECK_ABILITY, RequiredRule } from './ability.decorator';
import { AbilityFactory } from './ability.factory';

@Injectable()
export class AbilitiesGuard extends JwtAuthenticationGuard {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const ability = this.abilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
      });
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
