import { client } from '@/supabase/config/client'

export const get = async (id?: number) => {
	try {
		const { data, error } =
			typeof id === 'number'
				? await client
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
						.order('id', { ascending: false })
				: await client
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
						.order('id', { ascending: false })

		if (!data || data.length === 0) throw new Error('Products not found')
		if (error) throw error

		return data
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
