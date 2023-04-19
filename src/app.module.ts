import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RepositoryModule } from './repository/repository.module';
import { UsersModule } from './modules/users/users.module';
import { getDataBaseConfig } from './config';
import { Dialect } from 'sequelize';

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRoot({
			dialect: getDataBaseConfig().dialect as Dialect,
			host: getDataBaseConfig().host,
			port: getDataBaseConfig().port,
			username: getDataBaseConfig().username,
			password: getDataBaseConfig().password,
			database: getDataBaseConfig().databaseName,
			autoLoadModels: true,
		}),
		RepositoryModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
