import { Supabase } from '@/supabase'

export const register = async (user: Register) => {
	try {
		await Supabase.auth.Register(user)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
