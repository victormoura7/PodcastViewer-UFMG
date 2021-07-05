import { ApiProperty } from '@nestjs/swagger'

export class CreateUpdateResponse {
	constructor({ id }) {
		this.id = id
	}

	@ApiProperty()
	id: number
}
