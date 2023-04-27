import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpRequestWithUser } from '../types/http-payload.types';
import { JwtUserPayload } from '../interfaces';

export const HttpUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): JwtUserPayload => {
		const request: HttpRequestWithUser = ctx.switchToHttp().getRequest();
		return request.user;
	}
);
