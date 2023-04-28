import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { RoleRepository, UsersRepository } from './repositories';
import { Role } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/modules/roles/entities/userRole.entity';

const providers = [UsersRepository, RoleRepository];

@Global()
@Module({
	imports: [SequelizeModule.forFeature([User, Role, UserRole])],
	controllers: [],
	providers,
	exports: [...providers],
})
export class RepositoryModule {}
