import { Supabase } from '@/supabase'

export const update = async (product: Product) => {
	try {
		await Supabase.products.Update(product)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}