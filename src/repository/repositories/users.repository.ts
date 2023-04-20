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
}
