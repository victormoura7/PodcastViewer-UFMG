import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreatePodcastDTO } from './dto/create-podcast'
import { ListPodcastsQuery } from './dto/list-podcasts.query'
import { UpdatePodcastDTO } from './dto/update-podcast'
import { PodcastService } from './podcast.service'
import { CreateUpdateResponse } from '~/dto/create-update.response'
import { GetOneParams } from '~/dto/get-one-params'
import { ListResponse } from '~/dto/list.response'
import { Podcast, PodcastDocument } from '~/schemas/podcast.schema'

@Controller('podcasts')
@ApiTags('Podcast')
export class PodcastController {
	constructor(private service: PodcastService) {}

	@Get('list')
	@ApiOperation({ summary: 'Returns all podcasts' })
	@ApiResponse({
		status: 200,
		description: 'A list of podcasts',
		type: Podcast,
		isArray: true
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid query params'
	})
	async findAll(@Query() query: ListPodcastsQuery): Promise<ListResponse> {
		try {
			const documents = await this.service.getAll(query)

			const response = new ListResponse()
			response.documents = documents
			response.page = query.page ? query.page : 1
			response.length = query.pageSize ? query.pageSize : documents.length

			if (query.page) {
				const totalElements = await this.service.countAll(query)
				response.total_elements = totalElements
			} else {
				response.total_elements = documents.length
			}

			return response
		} catch (e) {
			throw new HttpException(
				`Unexpected error: ${e.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@Get()
	@ApiOperation({ summary: 'Fetches a podcast by its id' })
	@ApiResponse({
		status: 200,
		description: 'The podcast, if found',
		type: Podcast
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid id supplied'
	})
	@ApiResponse({
		status: 404,
		description: 'Podcast not found'
	})
	async getOne(@Query() params: GetOneParams): Promise<PodcastDocument> {
		try {
			const result = await this.service.getById(params.id)

			if (!result) throw new HttpException('Not found', HttpStatus.NOT_FOUND)

			return result
		} catch (e) {
			throw new HttpException(
				`Unexpected error: ${e.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@Post()
	@ApiOperation({ summary: 'Creates a podcast' })
	@ApiResponse({
		status: 200,
		description: 'The created podcasts ID',
		type: CreateUpdateResponse
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid payload'
	})
	async createNotice(
		@Body() data: CreatePodcastDTO
	): Promise<CreateUpdateResponse> {
		try {
			const result = await this.service.createPodcast(data)

			return new CreateUpdateResponse({ id: result.id })
		} catch (e) {
			throw new HttpException(
				`Unexpected error: ${e.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@Put('updateNotice')
	@ApiOperation({ summary: 'Updates a notice' })
	@ApiResponse({
		status: 200,
		description: 'The updated podcasts ID',
		type: CreateUpdateResponse
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid payload'
	})
	@ApiResponse({
		status: 404,
		description: 'Podcast not found'
	})
	async updateNotice(
		@Body() data: UpdatePodcastDTO
	): Promise<CreateUpdateResponse> {
		try {
			const result = await this.service.updateOne(data)

			if (!result) throw new HttpException('Not found', HttpStatus.NOT_FOUND)

			return new CreateUpdateResponse({ id: result.id })
		} catch (e) {
			if (e instanceof HttpException) {
				throw e
			}

			throw new HttpException(
				`Unexpected error: ${e.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@Delete()
	@ApiOperation({ summary: 'Deletes a podcast' })
	@ApiResponse({
		status: 200,
		description: 'Whether the podcast was deleted or not',
		type: Boolean
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid payload'
	})
	@ApiResponse({
		status: 404,
		description: 'Podcast not found'
	})
	async deletePodcast(@Query() params: GetOneParams): Promise<boolean> {
		try {
			const result = await this.service.remove(params.id)

			if (!result) throw new HttpException('Not found', HttpStatus.NOT_FOUND)

			return result
		} catch (e) {
			if (e instanceof HttpException) {
				throw e
			}

			throw new HttpException(
				`Unexpected error: ${e.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
