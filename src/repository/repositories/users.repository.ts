import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindUserBy } from 'src/common';
import { CreateUserRequest } from 'src/common/dto/user';
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
		return this.userModel.findOne({ where: { ...filter } });
	}

	async getAll(): Promise<User[]> {
		return this.userModel.findAll();
	}

	async updateToken(id: number, token: string) {
		return this.userModel.update(
			{ token },
			{
				where: {
					id,
				},
			}
		);
	}
}
