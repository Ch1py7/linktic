import type { AxiosError } from 'axios'
import { instance } from './axiosInstance'

export const create = async (product: Product) => {
	try {
		const { status } = await instance.post('/products/create', JSON.stringify(product))
		return { status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}

export const listProducts = async () => {
	try {
		const { data, status } = await instance.get('/products')
		return { data, status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}
