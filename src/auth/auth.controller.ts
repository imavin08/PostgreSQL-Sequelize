import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserResponse, SignUpRequestDto } from 'src/common/dto';
import { SignInRequestDto } from 'src/common/dto/auth/requests/signin.request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@ApiOperation({ summary: 'SignUp', description: 'signUp' })
	@ApiResponse({ type: UserResponse })
	async signUpLocal(@Body() user: SignUpRequestDto): Promise<string> {
		return this.authService.signUp(user);
	}

	@Get('confirm')
	@ApiOperation({ summary: 'Confirm', description: 'confirm' })
	@ApiResponse({ type: UserResponse })
	async confirmEmail(@Query('token') token: string): Promise<UserResponse> {
		return this.authService.confirmEmail(token);
	}

	// @UseGuards(JwtAuthGuard)
	@Post('signIn')
	@ApiOperation({ summary: 'SignIn', description: 'signIn' })
	@ApiResponse({ type: UserResponse })
	async signIn(@Body() req: SignInRequestDto): Promise<string> {
		return this.authService.signIn(req);
	}
}
