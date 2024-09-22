import { Supabase } from '@/supabase'

export const create = async (order: Order) => {
	try {
		const order_id = await Supabase.orders.Create(order.user_id)
    
		await Supabase.relations.AddProducts({ ...order, order_id })
	} catch (e) {
		throw new Error((e as Error).message)
	}
}