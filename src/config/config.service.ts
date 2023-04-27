import { get } from 'env-var';
import { Dialect } from 'sequelize';

export const getPort = () => get('PORT').required().asPortNumber();

export const getDataBaseConfig = () => ({
	dialect: get('DATABASE_DIALECT').required().asString() as Dialect,
	host: get('DATABASE_HOST').required().asString(),
	port: get('DATABASE_PORT').required().asPortNumber(),
	username: get('DATABASE_USERNAME').required().asString(),
	password: get('DATABASE_PASSWORD').required().asString(),
	database: get('DATABASE_NAME').required().asString(),
	autoLoadModels: true,
});

export const getAuth = () => ({
	jwtSecret: get('JWT_SECRET').asString(),
	expiresIn: get('EXPIRESIN').asInt(),
});
