import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserResponse, SignUpRequestDto } from 'src/common/dto';
import { SignInRequestDto } from 'src/common/dto/auth/requests/signin.request.dto';
import { RoleEnum } from 'src/common';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@ApiOperation({ summary: 'SignUp', description: 'signUp' })
	@ApiResponse({ type: UserResponse })
	async signUpLocal(@Body() user: SignUpRequestDto, @Req() req: any): Promise<string> {
		return this.authService.signUp(user, req.headers.origin);
	}

	@Get('confirm')
	@ApiOperation({ summary: 'Confirm', description: 'confirm' })
	@ApiResponse({ type: UserResponse })
	async confirmEmail(@Query('token') token: string): Promise<UserResponse> {
		return this.authService.confirmEmail(token);
	}

	@Post('signIn')
	@ApiOperation({ summary: 'SignIn', description: 'signIn' })
	@ApiQuery({ name: 'role', enum: RoleEnum })
	@ApiResponse({ type: UserResponse })
	async signIn(
		@Body() req: SignInRequestDto,
		@Query('role') role: RoleEnum
	): Promise<string> {
		return this.authService.signIn(req, role);
	}
}
