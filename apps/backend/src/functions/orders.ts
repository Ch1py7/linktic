import { Supabase } from '@/supabase'

export const getAll = async (id: number) => {
	try {
		const orders = await Supabase.orders.getAll(id)

		const order_products = orders.order_products.map((op) => {
			return {
				title: op.products!.title,
				product_id: op.product_id,
				quantity: op.quantity,
			}
		})

		return {
			status: orders.status,
			order_id: orders.id,
			order_products,
		}
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
