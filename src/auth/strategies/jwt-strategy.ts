import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { getAuth } from 'src/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiJwtPayload } from 'src/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: getAuth().jwtSecret,
		});
	}

	async validate(payload: ApiJwtPayload) {
		return payload;
	}
}
