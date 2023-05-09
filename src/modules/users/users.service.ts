import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/common';
import { CreateUserRequest, UserResponse } from 'src/common/dto';
import { CheckUserRole } from 'src/common/helpers/check-userRole';
import { RoleRepository, UsersRepository } from 'src/repository/repositories';
import { UserRole } from '../roles/entities/userRole.entity';

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

	async deleteUser(id: string): Promise<void> {
		return this.usersRepository.deleteUser(id);
	}

	async getInformationAboutMe(userId: string): Promise<UserResponse> {
		return this.usersRepository.findBy({ id: userId });
	}

	async addAdminRole(userId: string): Promise<UserRole> {
		const user = await this.usersRepository.findBy({ id: userId });
		const includeRole = CheckUserRole(user, RoleEnum.ADMIN);
		if (includeRole) {
			throw new BadRequestException(`User already has ${RoleEnum.ADMIN} role`);
		}
		const role = await this.roleRepository.findByName(RoleEnum.ADMIN);
		return this.roleRepository.addUserRole(userId, role.id);
	}

	async deleteAdminRole(userId: string): Promise<UserRole> {
		const user = await this.usersRepository.findBy({ id: userId });
		const includeRole = CheckUserRole(user, RoleEnum.ADMIN);
		if (!includeRole) {
			throw new BadRequestException(`User does not have ${RoleEnum.ADMIN} role`);
		}
		const role = await this.roleRepository.findByName(RoleEnum.ADMIN);
		await this.roleRepository.deleteUserRole(userId, role.id);
		return;
	}

	async changeUserStatus(
		id: string,
		status: boolean,
		roles: string[]
	): Promise<UserResponse> {
		const isSuperAdmin = roles.includes(RoleEnum.SUPER_ADMIN);
		if (!isSuperAdmin) {
			return this.usersRepository.updateStatusForUserAndAdminRole(id, status);
		}
		return this.usersRepository.updateStatusOnlyForUserRole(id, status);
	}
}
