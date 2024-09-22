import { Supabase } from '@/supabase'

export const get = async (id?: number) => {
	try {
		const orders = await Supabase.orders.Get(id)

		const parsedOrders = orders.map((order) => {
			return {
				order_id: order.id,
				status: order.status,
				order_products: order.order_products.map((op) => {
					return {
						title: op.products!.title.replace('_', ' '),
						product_id: op.product_id,
						quantity: op.quantity,
					}
				}),
			}
		})

		return parsedOrders
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
