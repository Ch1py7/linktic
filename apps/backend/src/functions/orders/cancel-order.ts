import { Supabase } from '@/supabase'

export const cancel = async (id: number) => {
	try {
		await Supabase.orders.Delete(id)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}