import { Supabase } from '@/supabase'

export const get = async () => {
	try {
		const data = await Supabase.users.Get()
		return data
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
