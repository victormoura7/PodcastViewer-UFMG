import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsString, IsOptional } from 'class-validator'

import { PaginationQuery } from '~/dto/pagination.query'

export class ListPodcastsQuery extends PaginationQuery {
	@ApiProperty({ required: false })
	@Type(() => Date)
	@IsOptional()
	@IsDate()
	createdAt?: any

	@ApiProperty({ required: false })
	@Type(() => Date)
	@IsOptional()
	@IsDate()
	updatedAt?: any

	@ApiProperty({ required: false })
	@Type(() => String)
	@IsString()
	@IsOptional()
	name?: any
}
