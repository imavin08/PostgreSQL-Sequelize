import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, UserResponse } from 'src/common/dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: '[CreateUser]',
		description: 'create user',
	})
	@ApiResponse({ type: UserResponse })
	async createBank(@Body() request: CreateUserRequest): Promise<UserResponse> {
		return this.usersService.createUser(request);
	}

	@Get()
	@ApiOperation({ summary: '[GetAllUsers]', description: 'get all users' })
	@ApiResponse({ type: UserResponse, isArray: true })
	async getAllUsers() {
		return this.usersService.getAllUsers();
	}
}
