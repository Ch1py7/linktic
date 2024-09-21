import { client } from './config/client'

export namespace Auth {
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
	export const getByCredentials = async ({ email, password, role }: Login) => {
		try {
			const { data, error } = await client
				.from('users')
				.select('name, role, email')
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

	export const userExists = async (email: string) => {
		try {
			const { data, error } = await client.from('users').select('email').eq('email', email)

			if (error) throw error

			return data
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}
}
