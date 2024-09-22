import { Supabase } from '@/supabase'

export const get = async () => {
	try {
		const products = await Supabase.products.Get()
		return products
	} catch (e) {
		throw new Error((e as Error).message)
	}
}