import { client } from '@/supabase/config/client'

export const update = async (product: Product) => {
	try {
		const { error } = await client.from('products').update(product).eq('id', product.id!)
		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
