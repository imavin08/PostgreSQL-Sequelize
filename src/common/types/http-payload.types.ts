import { ApiJwtPayload } from '../interfaces';

export type HttpRequestWithUser = Request & { user: ApiJwtPayload };
