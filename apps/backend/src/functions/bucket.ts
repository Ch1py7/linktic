import { client } from '@/supabase/config/client'

export const uploadFile = async (productName: string, file: Express.Multer.File) => {
	const { data, error } = await client.storage
		.from('products')
		.upload(`public/products/${productName}`, file.buffer, {
			cacheControl: '3600',
			upsert: true,
      contentType: file.mimetype
		})

	if (error) throw error
	return data
}
