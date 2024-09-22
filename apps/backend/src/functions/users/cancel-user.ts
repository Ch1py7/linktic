import { Supabase } from '@/supabase'

export const cancel = async (id: number) => {
	try {
		await Supabase.users.Delete(id)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
