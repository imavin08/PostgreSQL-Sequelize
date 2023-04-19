import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UserDto {
	@ApiProperty({ example: 'adam' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'adam@gmail.com' })
	@IsString()
	email: string;

	@ApiProperty({ example: '12345678' })
	@IsString()
	password: string;

	@ApiProperty({ example: false })
	@IsBoolean()
	isActive: boolean;
}
