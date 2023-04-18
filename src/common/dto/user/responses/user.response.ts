import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class UserResponse extends UserDto {
	@ApiProperty({ example: 1 })
	@Expose()
	@IsString()
	id?: number;
}
