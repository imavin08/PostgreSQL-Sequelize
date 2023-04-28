import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleEnum } from 'src/common';
import { Role } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/modules/roles/entities/userRole.entity';

@Injectable()
export class RoleRepository {
	constructor(
		@InjectModel(Role)
		private roleModel: typeof Role,
		@InjectModel(UserRole)
		private userRoleModel: typeof UserRole
	) {}

	async findByName(name: RoleEnum): Promise<Role> {
		return this.roleModel.findOne({ where: { name } });
	}

	async addUserRole(userId: string, roleId: string) {
		return this.userRoleModel.create({ userId, roleId });
	}
}
