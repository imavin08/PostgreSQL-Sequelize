import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { UserDto } from '../user.dto';

export class UserResponse extends UserDto {
	@ApiProperty({ example: 2 })
	@IsNumber()
	id: number;
}
