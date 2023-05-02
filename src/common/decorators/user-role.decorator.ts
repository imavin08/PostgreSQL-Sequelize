import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserRole = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): string[] => {
		const request = ctx.switchToHttp().getRequest();
		return request.user.roles.map(role => role.dataValues.name);
	}
);
