import { Injectable } from '@nestjs/common'
import * as mongoose from 'mongoose'

import { CreatePodcastDTO } from './dto/create-podcast'
import { ListPodcastsQuery } from './dto/list-podcasts.query'
import { UpdatePodcastDTO } from './dto/update-podcast'
import { PodcastRepository } from './podcast.repository'
import { Podcast, PodcastDocument } from '~/schemas/podcast.schema'

@Injectable()
export class PodcastService {
	constructor(private repository: PodcastRepository) {}

	async createPodcast(
		data: CreatePodcastDTO
	): Promise<Podcast & mongoose.Document<any>> {
		return await this.repository.create(data)
	}

	async getById(id: number): Promise<PodcastDocument> {
		return await this.repository.get(id)
	}

	async getAll(query: ListPodcastsQuery): Promise<PodcastDocument[]> {
		return await this.repository.getAll(query)
	}

	async countAll(query: ListPodcastsQuery) {
		return await this.repository.countAll(query)
	}

	async updateOne(
		data: UpdatePodcastDTO
	): Promise<Podcast & mongoose.Document<any>> {
		return await this.repository.update(data)
	}

	async remove(id: number): Promise<boolean> {
		return await this.repository.remove(id)
	}
}
