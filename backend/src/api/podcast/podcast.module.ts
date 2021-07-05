import { Module } from '@nestjs/common'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import * as AutoIncrementFactory from 'mongoose-sequence'

import { PodcastController } from './podcast.controller'
import { PodcastRepository } from './podcast.repository'
import { PodcastService } from './podcast.service'
import { Podcast, PodcastSchema } from '~/schemas/podcast.schema'

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Podcast.name,
				useFactory: async (connection: Connection) => {
					const schema = PodcastSchema
					const AutoIncrement = AutoIncrementFactory(connection)
					schema.plugin(AutoIncrement, {
						id: 'notice_id_counter',
						inc_field: 'id'
					})
					return schema
				},
				inject: [getConnectionToken('DatabaseConnection')]
			}
		])
	],
	providers: [PodcastRepository, PodcastService],
	controllers: [PodcastController],
	exports: [PodcastService]
})
export class PodcastModule {}
