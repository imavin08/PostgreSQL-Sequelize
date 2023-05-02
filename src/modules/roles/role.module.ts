import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RepositoryModule } from 'src/repository/repository.module';

const providers = [RoleService];

@Module({
	imports: [RepositoryModule],
	controllers: [],
	providers,
	exports: [...providers],
})
export class RoleModule {}
