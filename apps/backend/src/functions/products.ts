import { Supabase } from '@/supabase'
import { uploadFile } from './bucket'

const BUCKET_URL = process.env.BUCKET_URL

export const getAll = async () => {
	try {
		const products = await Supabase.products.getAll()
		return products
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const create = async (product: Omit<Product, 'image'> & { image: Express.Multer.File }) => {
  console.log(BUCKET_URL)
	try {
    const nameNoSpaces = product.title.replace(' ', '_')
		const bucket = await uploadFile(nameNoSpaces, product.image)
		await Supabase.products.create({
			...product,
			title: nameNoSpaces,
			image: `${BUCKET_URL}${bucket.fullPath}`,
		})
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
