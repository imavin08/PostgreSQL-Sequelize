import { JwtPayload } from 'jsonwebtoken';

export interface ApiJwtPayload extends JwtPayload {
	id: string;
	email: string;
	username: string;
}
