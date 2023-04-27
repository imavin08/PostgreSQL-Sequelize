import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ where: { email } });
	}

	async findById(id: number): Promise<User> {
		return this.userModel.findOne({ where: { id } });
	}

	async findByName(name: string): Promise<User> {
		return this.userModel.findOne({ where: { name } });
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
