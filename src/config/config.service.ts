import { get } from 'env-var';

export const getPort = () => get('PORT').asPortNumber();
