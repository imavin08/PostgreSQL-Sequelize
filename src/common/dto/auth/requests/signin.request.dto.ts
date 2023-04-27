import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDto {
	@ApiProperty({ example: 'adam@gmail.com' })
	@IsString()
	email: string;

	@ApiProperty({ example: '12345678' })
	@IsString()
	password: string;
}
