import { client } from '@/supabase/config/client'

export const delete_ = async (id: number) => {
	try {
		const { error } = await client.from('users').delete().eq('id', id)
		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}