import { client } from './config/client'

export namespace Products {
	export const getAll = async () => {
		try {
			const { data, error } = await client
				.from('products')
				.select('id, title, description, price, image')
				.eq('is_deleted', false)
				.order('id', { ascending: false })

			if (error) throw error
			if (!data) throw new Error('Product not found')

			return data
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}
	export const create = async (product: Product) => {
		try {
			const { error } = await client.from('products').insert(product)
			if (error) throw error
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}
	export const update = async (product: Product) => {
		try {
			const { error } = await client.from('products').update(product).eq('id', product.id!)
			if (error) throw error
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}
	export const delete_ = async (id: number) => {
		try {
			const { error } = await client.from('products').update({ is_deleted: true }).eq('id', id)
			if (error) throw error
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}
}
