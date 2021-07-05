import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class PaginationQuery {
	@ApiProperty({ required: false })
	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	@Min(1)
	page?: number

	@ApiProperty({ name: 'page_size', required: false })
	@Expose({ name: 'page_size' })
	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	@Min(1)
	pageSize?: number
}
