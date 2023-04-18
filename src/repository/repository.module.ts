import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from './repositories';

const providers = [UsersRepository];

@Global()
@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [],
	providers,
	exports: [...providers, SequelizeModule.forFeature([User])],
})
export class RepositoryModule {}
