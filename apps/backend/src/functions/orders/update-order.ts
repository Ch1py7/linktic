import { Supabase } from '@/supabase'

export const update = async (order_id: number) => {
	try {
		await Supabase.orders.Update(order_id)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}