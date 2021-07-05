import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PodcastModule } from './podcast/podcast.module'
import { MONGO_DB_CONFIG } from '~/config/mongoose.config'

@Module({
	imports: [
		MongooseModule.forRoot(MONGO_DB_CONFIG.url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		}),
		PodcastModule
	]
})
export class AppModule {}
