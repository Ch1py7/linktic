import { client } from '@/supabase/config/client'

export const getByCredentials = async ({ email, password, role }: Login) => {
	try {
		const { data, error } = await client
			.from('users')
			.select('id, name, role, email')
			.eq('email', email)
			.eq('password', password)
			.eq('role', role)

		if (error) throw error
		if (data.length === 0) throw new Error('User not found or incorrect credentials')

		return data[0]
	} catch (e) {
		throw new Error((e as Error).message)
	}
}