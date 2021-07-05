import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetOneParams {
	@ApiProperty()
	@IsNotEmpty()
	id: number
}
