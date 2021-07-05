import * as Dotenv from 'dotenv'
Dotenv.config()

export const MONGO_DB = {
	URL: process.env.MONGO_URL
}

export const PORT = process.env.PORT || 8080
