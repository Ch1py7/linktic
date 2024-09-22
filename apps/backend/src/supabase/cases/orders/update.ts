import { client } from '@/supabase/config/client'

export const update = async (order_id: number) => {
	try {
		const { error } = await client.from('orders').update({ status: true }).eq('id', order_id)

		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}