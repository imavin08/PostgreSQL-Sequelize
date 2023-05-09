import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserRoleDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): string[] => {
		const request = ctx.switchToHttp().getRequest();
		return request.user.roles.map(role => role.dataValues.name);
	}
);
