import { getSession } from '@/lib/storage'
import type { AxiosError } from 'axios'
import { instance } from './axiosInstance'

export const listUsers = async () => {
	try {
		const { token } = getSession()
		const { data, status } = await instance.get<AllUsers[]>('/users', {
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

export const deleteUser = async (id: number) => {
	try {
		const { token } = getSession()
		const { status } = await instance.delete(`/users/delete?id=${id}`, {
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

export const updateUser = async ({ id, name, role }: UpdateUser) => {
	try {
		const { token } = getSession()
		const { status } = await instance.put(
			'/users/update',
			{ id, name, role },
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

interface UpdateUser {
	id: number
	name: string
	role: string
}
