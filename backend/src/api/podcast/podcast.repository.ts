import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as mongoose from 'mongoose'

import { CreatePodcastDTO } from './dto/create-podcast'
import { ListPodcastsQuery } from './dto/list-podcasts.query'
import { UpdatePodcastDTO } from './dto/update-podcast'
import { Podcast, PodcastDocument } from '~/schemas/podcast.schema'

@Injectable()
export class PodcastRepository {
	constructor(
		@InjectModel('Podcast') private Database: Model<PodcastDocument>
	) {}

	async create(
		data: CreatePodcastDTO
	): Promise<Podcast & mongoose.Document<any>> {
		const podcast = new this.Database({
			...data,
			createdAt: new Date()
		})

		return await podcast.save()
	}

	async get(id: number): Promise<PodcastDocument> {
		return this.Database.findOne({ id: id }).exec()
	}

	async getAll(query: ListPodcastsQuery): Promise<PodcastDocument[]> {
		const { page, pageSize, ...filter } = query

		return this.Database.find(filter)
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.exec()
	}

	async countAll(query: ListPodcastsQuery) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { page, pageSize, ...filter } = query

		return this.Database.countDocuments(filter).exec()
	}

	async update(
		data: UpdatePodcastDTO
	): Promise<Podcast & mongoose.Document<any>> {
		const { id } = data
		delete data.id

		return await this.Database.findOneAndUpdate(
			{ id },
			{
				...data,
				updatedAt: new Date()
			}
		).exec()
	}

	async remove(id: number) {
		const result = await this.Database.deleteOne({ id })

		if (result.deletedCount == 0) {
			return false
		}

		return true
	}
}
