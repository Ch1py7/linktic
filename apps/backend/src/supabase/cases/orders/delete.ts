import { client } from '@/supabase/config/client'

export const delete_ = async (id: number) => {
	try {
		const { error: e_oError } = await client.from('order_products').delete().eq('order_id', id)
		const { error: pError } = await client.from('orders').delete().eq('id', id)
		if (pError) throw pError
		if (e_oError) throw e_oError
	} catch (e) {
		throw new Error((e as Error).message)
	}
}