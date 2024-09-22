import { Supabase } from '@/supabase'

export const getAll = async () => {
	try {
		const data = await Supabase.users.getAll()
		return data
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const delete_ = async (id: number) => {
	try {
		await Supabase.users.delete_(id)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const update = async ({ id, name, role }: { id: number; name: string; role: string }) => {
	try {
		await Supabase.users.update({ id, name, role })
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
