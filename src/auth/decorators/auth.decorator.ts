import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesDecorator } from './role.decorator';
import { Role } from '../../common/enum/Roles.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function AuthDecorator(role: Role) {
  return applyDecorators(
    RolesDecorator(role),
    UseGuards(AuthGuard, RolesGuard),
  );
}
