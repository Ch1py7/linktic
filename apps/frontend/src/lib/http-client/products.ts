import { getSession } from '@/lib/storage'
import type { AxiosError } from 'axios'
import { instance } from './axiosInstance'

export const create = async (image: FormData) => {
	try {
		const { token } = getSession()
		const { status } = await instance.post('/products/create', image, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		})
		return { status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}

export const listProducts = async () => {
	try {
		const { token } = getSession()
		const { data, status } = await instance.get('/products', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return { data, status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}
