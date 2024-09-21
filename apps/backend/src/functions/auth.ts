import { Supabase } from '@/supabase'
import { signJwt } from './jwt'

export const register = async (user: Register) => {
	try {
		await Supabase.auth.register(user)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const login = async (user: Login) => {
	try {
		const { email, id, name, role } = await Supabase.auth.getByCredentials(user)
		const token = signJwt({ sub: id, role })
		return { email, name, token, role }
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
