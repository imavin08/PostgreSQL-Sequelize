import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { UsersService } from 'src/modules/users/users.service';
import { MailerService } from 'src/modules/mail/mail.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';

const providers = [AuthService, UsersService, MailerService, JwtStrategy, JwtService];

@Module({
	imports: [RepositoryModule, PassportModule, JwtModule.register({})],
	controllers: [AuthController],
	providers,
	exports: [...providers],
})
export class AuthModule {}
