import { Supabase } from '@/supabase'

export const register = async (user: Register) => {
	try {
		await Supabase.auth.register(user)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const login = async (user: Login) => {
	try {
		const userData = await Supabase.auth.getByCredentials(user)
    return userData
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
