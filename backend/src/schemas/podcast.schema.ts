import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'

const { Types } = mongoose.Schema

@Schema()
export class Podcast {
	@ApiProperty()
	@Prop({ type: Types.Number })
	id: number

	@ApiProperty()
	@Prop({ required: true, type: Types.Date, default: Date.now })
	createdAt: Date

	@ApiProperty()
	@Prop({ required: true, type: Types.Date, default: Date.now })
	updatedAt: Date

	@ApiProperty()
	@Prop({ required: true, type: Types.String })
	name: string
}

export type PodcastDocument = Podcast & mongoose.Document

export const PodcastSchema = SchemaFactory.createForClass(Podcast)
