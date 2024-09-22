import { client } from '@/supabase/config/client'

export const create = async (user_id: number) => {
	try {
		const { data, error } = await client.from('orders').insert({ user_id }).select('id').single()

		if (error) throw error
		if (data.id === 0) throw new Error('An error has occurred')

		return data.id
	} catch (e) {
		throw new Error((e as Error).message)
	}
}