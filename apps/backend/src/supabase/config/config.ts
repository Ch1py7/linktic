import dotenv from 'dotenv'
dotenv.config()

export const config = {
	supabase: {
		key: process.env.SUPABASE_KEY!,
		url: process.env.SUPABASE_URL!,
	},
}
