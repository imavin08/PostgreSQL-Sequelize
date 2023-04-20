import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RepositoryModule } from './repository/repository.module';
import { UsersModule } from './modules/users/users.module';
import { getDataBaseConfig } from './config';
import { validate } from '../env.validation';

@Module({
	imports: [
		ConfigModule.forRoot({ validate }),
		SequelizeModule.forRoot(getDataBaseConfig()),
		RepositoryModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
