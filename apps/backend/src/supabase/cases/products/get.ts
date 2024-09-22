import { client } from '@/supabase/config/client'

export const get = async () => {
	try {
		const { data, error } = await client
			.from('products')
			.select('id, title, description, price, image')
			.eq('is_deleted', false)
			.order('id', { ascending: false })

		if (error) throw error
		if (!data) throw new Error('Product not found')

		return data
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
