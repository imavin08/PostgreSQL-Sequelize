import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, UserResponse } from 'src/common/dto';
import { HttpUser, JwtAuthGuard, RoleEnum, Roles, UserRoleDecorator } from 'src/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from '../roles/entities/userRole.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
	@ApiOperation({ summary: '[GetAllUsers]', description: 'get all users' })
	@ApiResponse({ type: UserResponse, isArray: true })
	async getAllUsers(@UserRoleDecorator() roles: string[]): Promise<UserResponse[]> {
		return this.usersService.getAllUsers(roles);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteUser]', description: 'delete user' })
	async deleteUser(@Param('id') id: string): Promise<void> {
		return this.usersService.deleteUser(id);
	}

	@Get('me')
	@ApiResponse({ type: UserResponse })
	@ApiOperation({
		summary: '[Get information about me]',
		description: 'get information about me',
	})
	async getInformationAboutMe(
		@HttpUser('user') user: UserResponse
	): Promise<UserResponse> {
		return this.usersService.getInformationAboutMe(user.id);
	}

	@Roles(RoleEnum.SUPER_ADMIN)
	@Post('addAdminRole/:userId')
	@ApiResponse({ type: UserRole })
	@ApiOperation({
		summary: '[Add admin role]',
		description: 'add admin role',
	})
	async addAdminRole(@Param('userId') userId: string): Promise<UserRole> {
		return this.usersService.addAdminRole(userId);
	}

	@Roles(RoleEnum.SUPER_ADMIN)
	@Delete('deleteAdminRole/:userId')
	@ApiResponse({ type: UserRole })
	@ApiOperation({
		summary: '[Delete admin role]',
		description: 'delete admin role',
	})
	async deleteAdminRole(@Param('userId') userId: string): Promise<void> {
		await this.usersService.deleteAdminRole(userId);
	}

	@Post()
	@ApiOperation({
		summary: '[CreateUser]',
		description: 'create user',
	})
	@ApiResponse({ type: UserResponse })
	async createBank(@Body() request: CreateUserRequest): Promise<UserResponse> {
		return this.usersService.createUser(request);
	}

	@Patch(':id')
	@Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
	@ApiOperation({
		summary: '[Change user status]',
		description: 'change user status',
	})
	async changeUserStatus(
		@Param('id') id: string,
		@Query('status') status: true | false,
		@UserRoleDecorator() roles: string[]
	): Promise<UserResponse> {
		return this.usersService.changeUserStatus(id, status, roles);
	}
}
