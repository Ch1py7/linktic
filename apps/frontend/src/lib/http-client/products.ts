import type { AxiosError } from 'axios'
import { getSession } from '@/lib/storage'
import { instance } from './axiosInstance'

export const create = async (product: Product) => {
	try {
		const { token } = getSession()
		const { status } = await instance.post('/products/create', JSON.stringify(product), {
			headers: {
				Authorization: `Bearer ${token}`,
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
