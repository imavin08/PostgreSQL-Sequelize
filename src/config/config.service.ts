import { get } from 'env-var';

export const getPort = () => get('PORT').asPortNumber();

export const getDataBaseConfig = () => ({
	dialect: get('DATABASE_DIALECT').asString(),
	host: get('DATABASE_HOST').asString(),
	port: get('DATABASE_PORT').asPortNumber(),
	username: get('DATABASE_USERNAME').asString(),
	password: get('DATABASE_PASSWORD').asString(),
	databaseName: get('DATABASE_NAME').asString(),
});
