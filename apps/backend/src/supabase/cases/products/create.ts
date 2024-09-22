import { client } from '@/supabase/config/client'

export const create = async (product: Product) => {
	try {
		const { error } = await client.from('products').insert(product)
		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}