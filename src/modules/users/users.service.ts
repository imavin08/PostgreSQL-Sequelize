import { Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/common';
import { CreateUserRequest, UserResponse } from 'src/common/dto';
import { RoleRepository, UsersRepository } from 'src/repository/repositories';

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly roleRepository: RoleRepository
	) {}

	async createUser(request: CreateUserRequest): Promise<UserResponse> {
		const role = await this.roleRepository.findByName(RoleEnum.USER);
		const user = await this.usersRepository.createUser(request);
		await this.roleRepository.addUserRole(user.id, role.id);
		return user;
	}

	async findByName(name: string): Promise<UserResponse> {
		return this.usersRepository.findBy({ name });
	}

	async getAllUsers(roles: string[]): Promise<UserResponse[]> {
		const isSuperAdmin = roles.includes(RoleEnum.SUPER_ADMIN);
		if (isSuperAdmin) {
			return this.usersRepository.getAllForSuperAdmin();
		}
		return this.usersRepository.getAllForAdmin();
	}

	async deleteUser(id: string) {
		return this.usersRepository.deleteUser(id);
	}
}
