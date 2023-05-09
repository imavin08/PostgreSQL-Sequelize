import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import jwtDecode from 'jwt-decode';
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { SignUpRequestDto } from 'src/common/dto/auth';
import { RoleRepository, UsersRepository } from 'src/repository/repositories';
import { UsersService } from 'src/modules/users/users.service';
import { UserResponse } from 'src/common/dto';
import { MailerService } from 'src/modules/mail/mail.service';
import { getAuth } from 'src/config';
import { SignInRequestDto } from 'src/common/dto/auth/requests/signin.request.dto';
import { CheckUserRole, RoleEnum } from 'src/common';

@Injectable()
export class AuthService {
	private readonly jwtSecret: string;
	private readonly expiresIn: number;
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersService: UsersService,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
		private readonly roleRepository: RoleRepository
	) {
		this.jwtSecret = getAuth().jwtSecret;
		this.expiresIn = getAuth().expiresIn;
	}

	async signUp(user: SignUpRequestDto, reqHost: string): Promise<string> {
		const userExists = await this.usersRepository.findBy({
			email: user.email,
		});
		if (userExists) {
			throw new ConflictException(`User with email ${user.email} has already existed`);
		}
		try {
			user.password = await hash(user.password, 10);

			const token = await this.jwtService.signAsync(
				{
					name: user.name,
					password: user.password,
					email: user.email,
				},
				{
					secret: this.jwtSecret,
					expiresIn: this.expiresIn,
				}
			);

			await this.mailerService.sendMail(user.email, token, reqHost);
			return 'Please confirm your email';
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async confirmEmail(token: string): Promise<UserResponse> {
		const payload: SignUpRequestDto = jwtDecode(token);
		return this.usersService.createUser(payload);
	}

	async signIn(req: SignInRequestDto, role: RoleEnum): Promise<string> {
		const user = await this.usersRepository.findBy({ email: req.email });
		if (!user) {
			throw new NotFoundException('Email or password is not correct');
		} else if (!user.isActive) {
			throw new BadRequestException('User is not active');
		}
		const checkPassword = await compare(req.password, user.password);
		if (!checkPassword) {
			throw new BadRequestException('Email or password is not correct');
		}
		const includeRole = CheckUserRole(user, role);
		if (!includeRole) {
			throw new ForbiddenException('You do not have access rights under this role');
		}

		const token = await this.jwtService.signAsync(
			{
				id: user.id,
				name: user.name,
				email: user.email,
				role,
			},
			{
				secret: this.jwtSecret,
				expiresIn: this.expiresIn,
			}
		);

		return token;
	}
}
