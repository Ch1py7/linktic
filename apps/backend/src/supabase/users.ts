import { client } from './config/client'

export namespace Users {
	export const getAll = async () => {
		try {
			const { data, error } = await client.from('users').select('id, name, role')

			if (error) throw error

			return data
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}

	export const delete_ = async (id: number) => {
		try {
			const { error } = await client.from('users').delete().eq('id', id)
			if (error) throw error
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}

	export const update = async ({ id, name, role }: { id: number; name: string; role: string }) => {
		try {
			const { error } = await client.from('users').update({ name, role }).eq('id', id)
			if (error) throw error
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}
}
