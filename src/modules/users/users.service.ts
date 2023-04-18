import { Injectable } from '@nestjs/common';
import { CreateUserRequest, UserResponse } from 'src/common/dto';
import { UsersRepository } from 'src/repository/repositories';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async createUser(request: CreateUserRequest): Promise<UserResponse> {
		return this.usersRepository.createUser(request);
	}
}
