import { Supabase } from '@/supabase'

export const getAll = async () => {
	try {
		const products = await Supabase.products.getAll()
    return products
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const create = async (product: Product) => {
	try {
		await Supabase.products.create(product)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const update = async (product: Product) => {
	try {
		await Supabase.products.update(product)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const delete_ = async (id: number) => {
	try {
		await Supabase.products.delete_(id)
	} catch (e) {
		throw new Error((e as Error).message)
	}
}
