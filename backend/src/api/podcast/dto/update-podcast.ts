import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class UpdatePodcastDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	id: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string
}
