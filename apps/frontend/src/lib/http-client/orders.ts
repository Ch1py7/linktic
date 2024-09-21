import type { AxiosError } from 'axios'
import { instance } from './axiosInstance'

export const listOrders = async (email: string) => {
	try {
		const { data, status } = await instance.get(`/orders?email=${email}`)
		return { data, status }
	} catch (e) {
		const error = e as AxiosError
		throw error.response?.data
	}
}
