import { Supabase } from '@/supabase'

export const getAll = async (id: number) => {
	try {
		const orders = await Supabase.orders.getAll(id)

		const parsedOrders = orders.map((order) => {
			return {
				order_id: order.id,
				status: order.status,
				order_products: order.order_products.map((op) => {
					return {
						title: op.products!.title,
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

export const create = async (order: Order) => {
	try {
		const orderId = await Supabase.orders.createOrder(order.user_id)
		await Supabase.orders.addProducts({ ...order, order_id: orderId })
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const delete_ = async (id: number) => {
	try {
		await Supabase.orders.delete_(id)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
