import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserRequest {
	@ApiProperty({ example: 'token' })
	@IsString()
	token: string;
}
