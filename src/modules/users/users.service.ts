import { Injectable } from '@nestjs/common';
import { CreateUserRequest, UserResponse } from 'src/common/dto';
import { UsersRepository } from 'src/repository/repositories';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async createUser(request: CreateUserRequest): Promise<UserResponse> {
		return this.usersRepository.createUser(request);
	}

	async findByName(name: string): Promise<UserResponse> {
		return this.usersRepository.findByName(name);
	}

	async getAllUsers(): Promise<UserResponse[]> {
		return this.usersRepository.getAll();
	}

	async updateToken(id: number, token: string) {
		return this.usersRepository.updateToken(id, token);
	}
}
