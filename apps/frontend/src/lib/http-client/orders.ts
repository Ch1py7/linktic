import { getSession } from '@/lib/storage'
import type { AxiosError } from 'axios'
import { instance } from './axiosInstance'

export const listOrders = async () => {
	try {
		const { token } = getSession()
		const { data, status } = await instance.get('/orders', {
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

export const createOrder = async () => {
	try {
		const { token } = getSession()
		const { data, status } = await instance.post('/order/create', {
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
