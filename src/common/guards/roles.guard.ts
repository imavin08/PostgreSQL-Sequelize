import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums';
import { UsersRepository } from 'src/repository/repositories';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly usersRepository: UsersRepository
	) {}

	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());

		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const currentUser: User = await this.usersRepository.findBy({ id: user.id });
		const currentUserRoles = currentUser.roles.map(role => role.dataValues.name);
		request.user = currentUser;
		return roles.some(role => currentUserRoles.includes(role));
	}
}
