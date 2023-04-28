import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/common/dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: '[GetAllUsers]', description: 'get all users' })
	@ApiResponse({ type: UserResponse, isArray: true })
	async getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteUser]', description: 'delete user' })
	async deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id);
	}
}
