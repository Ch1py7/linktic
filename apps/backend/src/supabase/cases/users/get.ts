import { client } from '@/supabase/config/client'

export const get = async () => {
	try {
		const { data, error } = await client.from('users').select('id, name, role')

		if (error) throw error

		return data
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
