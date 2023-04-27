import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import jwtDecode from 'jwt-decode';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { SignUpRequestDto } from 'src/common/dto/auth';
import { UsersRepository } from 'src/repository/repositories';
import { UsersService } from 'src/modules/users/users.service';
import { UserResponse } from 'src/common/dto';
import { MailerService } from 'src/modules/mail/mail.service';
import { getAuth } from 'src/config';
import { SignInRequestDto } from 'src/common/dto/auth/requests/signin.request.dto';

@Injectable()
export class AuthService {
	private readonly jwtSecret: string;
	private readonly expiresIn: number;
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly usersService: UsersService,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService
	) {
		this.jwtSecret = getAuth().jwtSecret;
		this.expiresIn = getAuth().expiresIn;
	}

	async signUp(user: SignUpRequestDto): Promise<string> {
		const userExists = await this.usersRepository.findByEmail(user.email);
		if (userExists) {
			throw new ConflictException(
				`User with email ${user.email} has already existed`
			);
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
			await this.mailerService.sendMail(user.email, token);
			return 'Please confirm your email';
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async confirmEmail(token: string): Promise<UserResponse> {
		const payload: SignUpRequestDto = jwtDecode(token);
		return this.usersService.createUser(payload);
	}

	async signIn(req: SignInRequestDto): Promise<string> {
		const user = await this.usersRepository.findByEmail(req.email);
		if (!user) {
			throw new NotFoundException(`Email ${req.email} not found`);
		} else if (!user.isActive) {
			throw new BadRequestException('User is not active');
		}

		const checkPassword = await compare(req.password, user.password);
		if (!checkPassword) {
			throw new BadRequestException('Password not valid');
		}

		const token = await this.jwtService.signAsync(
			{
				id: user.id,
				name: user.name,
				email: user.email,
			},
			{
				secret: this.jwtSecret,
				expiresIn: this.expiresIn,
			}
		);
		await this.usersService.updateToken(user.id, token);
		return token;
	}
}
