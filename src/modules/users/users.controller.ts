import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/common/dto';
import { JwtAuthGuard, RoleEnum, Roles, UserRole } from 'src/common';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.USER)
	@ApiOperation({ summary: '[GetAllUsers]', description: 'get all users' })
	@ApiResponse({ type: UserResponse, isArray: true })
	async getAllUsers(@UserRole() roles: string[]) {
		return this.usersService.getAllUsers(roles);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteUser]', description: 'delete user' })
	async deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id);
	}
}
