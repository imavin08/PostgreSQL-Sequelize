import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
	@IsNumber()
	PORT: number;

	@IsString()
	DATABASE_DIALECT: string;

	@IsString()
	DATABASE_HOST: string;

	@IsNumber()
	DATABASE_PORT: number;

	@IsString()
	DATABASE_USERNAME: string;

	@IsString()
	DATABASE_PASSWORD: string;

	@IsString()
	DATABASE_NAME: string;

	@IsString()
	JWT_SECRET: string;

	@IsNumber()
	EXPIRESIN: number;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
