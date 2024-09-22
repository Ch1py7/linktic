import { client } from '@/supabase/config/client'
import { userExists } from './user-exists'

export const register = async (user: Register) => {
	try {
		const email = await userExists(user.email)

		if (email.length !== 0) throw new Error('Email already exists')

		const { error } = await client.from('users').insert(user)

		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}