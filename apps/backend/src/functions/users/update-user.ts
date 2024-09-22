import { Supabase } from '@/supabase'

export const update = async ({ id, name, role }: { id: number; name: string; role: string }) => {
	try {
		await Supabase.users.Update({ id, name, role })
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
