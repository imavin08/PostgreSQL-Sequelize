import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

const providers = [UsersService];

@Module({
	imports: [RepositoryModule],
	controllers: [UsersController],
	providers,
	exports: [...providers],
})
export class UsersModule {}
