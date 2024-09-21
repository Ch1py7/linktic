import { client } from './config/client'

export namespace Orders {
	export const getAll = async (id: number) => {
		try {
			const { data, error } = await client
				.from('orders')
				.select(`
            status,
            id,
            order_products (
              quantity,
              product_id,
              products (
                title
              )
            )
          `)
				.eq('user_id', id)

			if (!data || data.length === 0) throw new Error('Products not found')
			if (error) throw error

			return data
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}

	export const createOrder = async (user_id: number) => {
		try {
			const { data, error } = await client.from('orders').insert({ user_id }).select('id').single()

			if (error) throw error
			if (data.id === 0) throw new Error('An error has occurred')

			return data.id
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}

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
}
