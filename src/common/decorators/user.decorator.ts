import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpRequestWithUser } from '../types/http-payload.types';
import { ApiJwtPayload } from '../interfaces';

export const HttpUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): ApiJwtPayload => {
		const request: HttpRequestWithUser = ctx.switchToHttp().getRequest();
		return request.user;
	}
);
