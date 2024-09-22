import { client } from '@/supabase/config/client'

export const userExists = async (email: string) => {
	try {
		const { data, error } = await client.from('users').select('email').eq('email', email)

		if (error) throw error

		return data
	} catch (e) {
		throw new Error((e as Error).message)
	}
}