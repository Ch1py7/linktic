import { Supabase } from '@/supabase'
import { signJwt } from '../service/jwt'

export const login = async (user: Login) => {
	try {
		const { email, id, name, role } = await Supabase.auth.Login(user)
		const token = signJwt({ sub: id, role })
		return { email, name, token, role }
	} catch (e) {
		throw new Error((e as Error).message)
	}
}