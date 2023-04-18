import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class UserDto {
	@ApiProperty({ example: 'adam' })
	@Expose()
	@IsString()
	name: string;

	@ApiProperty({ example: 'adam@gmail.com' })
	@Expose()
	@IsString()
	email: string;

	@ApiProperty({ example: '12345678' })
	@Expose()
	@IsString()
	password: string;

	@ApiProperty({ example: false })
	@Expose()
	@IsBoolean()
	isActive: boolean;
}
