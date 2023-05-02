import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindUserBy } from 'src/common';
import { RoleEnum } from 'src/common/enums/role.enum';

import { CreateUserRequest } from 'src/common/dto/user';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UsersRepository {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	) {}

	async createUser(request: CreateUserRequest): Promise<User> {
		return this.userModel.create({ ...request });
	}

	async findBy(filter: FindUserBy): Promise<User> {
		return this.userModel.findOne({ where: { ...filter }, include: { model: Role } });
	}

	async getAllForSuperAdmin(): Promise<User[]> {
		return this.userModel.findAll({
			include: {
				model: Role,
				where: {
					[Op.or]: [{ name: RoleEnum.USER }, { name: RoleEnum.ADMIN }],
				},
			},
		});
	}

	async getAllForAdmin(): Promise<User[]> {
		return this.userModel.findAll({
			include: {
				model: Role,
				where: { name: RoleEnum.USER },
			},
		});
	}

	async deleteUser(id: string) {
		const user = await this.findBy({ id });
		return user.destroy();
	}
}
