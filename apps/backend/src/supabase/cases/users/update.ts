import { client } from '@/supabase/config/client'

export const update = async ({ id, name, role }: { id: number; name: string; role: string }) => {
	try {
		const { error } = await client.from('users').update({ name, role }).eq('id', id)
		if (error) throw error
	} catch (e) {
		throw new Error((e as Error).message)
	}
}