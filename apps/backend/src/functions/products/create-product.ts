import { Supabase } from '@/supabase'
import { upload } from '@/functions/bucket/upload'

const BUCKET_URL = process.env.BUCKET_URL

export const create = async (product: Omit<Product, 'image'> & { image: Express.Multer.File }) => {
	try {
		const nameNoSpaces = product.title.replace(' ', '_')
		const bucket = await upload(nameNoSpaces, product.image)
		await Supabase.products.Create({
			...product,
			title: nameNoSpaces,
			image: `${BUCKET_URL}${bucket.fullPath}`,
		})
	} catch (e) {
		throw new Error((e as Error).message)
	}
}