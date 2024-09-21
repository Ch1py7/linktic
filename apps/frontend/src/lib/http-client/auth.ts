import type { AxiosError } from 'axios'
import { instance } from './axiosInstance'

export const register = async (user: User) => {
	try {
		const { status } = await instance.post('/auth/register', JSON.stringify(user))
    
		return { status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}

export const login = async (user: Omit<User, 'name'>) => {
	try {
		const { data } = await instance.post<Omit<User, 'password'> & { token: string }>(
			'/auth/login',
			JSON.stringify(user)
		)

		return { data }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}
