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

export const createOrder = async (products: { product_id: number; quantity: number }[]) => {
	try {
		const { token } = getSession()
		const { status } = await instance.post(
			'/order/create',
			{ products },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return { status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}

export const cancelOrder = async (id: number) => {
	try {
		const { token } = getSession()
		const { status } = await instance.delete(`/order/cancel?id=${id}`, {
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
