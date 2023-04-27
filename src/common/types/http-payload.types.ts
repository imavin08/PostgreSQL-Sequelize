import { JwtUserPayload } from '../interfaces';

export type HttpRequestWithUser = Request & { user: JwtUserPayload };
