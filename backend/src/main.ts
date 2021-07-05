import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as rateLimit from 'express-rate-limit'

import { AppModule } from '~/api/app.module'
import { PORT } from '~/constants'

function initializeSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('PodcastViewer')
		.setDescription('PodcastViewer API')
		.setVersion('0.0.1')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors()
	app.use(
		rateLimit({
			windowMs: 60 * 1000, // um minuto
			max: 100 // máximo de 100 requests por IP por windowMs
		})
	)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			validationError: {
				target: false,
				value: false
			}
		})
	)

	initializeSwagger(app)

	await app.listen(PORT)
	Logger.log(`🚀 API rodando em ${await app.getUrl()}`, 'BOOTSTRAP')
}

bootstrap()
