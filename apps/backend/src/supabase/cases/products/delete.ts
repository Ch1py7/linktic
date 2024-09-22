import { client } from '@/supabase/config/client'

export const delete_ = async (id: number) => {
	try {
		const { error } = await client.from('products').update({ is_deleted: true }).eq('id', id)
		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}