import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('sequelizeProject example')
		.setDescription('The sequelizeProject API description')
		.setVersion('1.0')
		.addTag('sequelizeProject')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(getPort());
}
bootstrap();
