import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/repository/repositories';
import { Role } from './entities/role.entity';
import { RoleEnum } from 'src/common';

@Injectable()
export class RoleService {
	constructor(private readonly roleRepository: RoleRepository) {}

	async findByName(name: RoleEnum): Promise<Role> {
		return this.roleRepository.findByName(name);
	}
}
