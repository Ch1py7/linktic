import { client } from '@/supabase/config/client'

export const addProducts = async (order: Order) => {
	try {
		for (const product of order.products) {
			const { error } = await client.from('order_products').insert({
				order_id: order.order_id!,
				product_id: product.product_id,
				quantity: product.quantity,
			})

			if (error) throw error
		}
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
