import { cancel } from '@/functions/products/cancel-product'
import { create } from '@/functions/products/create-product'
import { get } from '@/functions/products/get-product'
import { update } from '@/functions/products/update-product'
import { verifyJwt } from '@/functions/service/jwt'
import express from 'express'
import { body, validationResult } from 'express-validator'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

router.get('/products', async (req: express.Request, res: express.Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] ?? ''
		const payload = verifyJwt<{ sub: number; exp: number; role: 'admin' | 'user' }>(token)

		if (Date.now() > payload.exp * 1000) {
			return res.status(401).send(['token expired'])
		}

		const products = await get()

		res.status(200).send(products)
	} catch (e) {
		res.status(400).send([(e as Error).message])
	}
})

router.post(
	'/products/create',
	upload.single('image'),
	async (req: express.Request, res: express.Response) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				const error = errors.array().map((e) => e.msg)
				return res.status(400).json(error)
			}

			const token = req.headers.authorization?.split(' ')[1] ?? ''
			const payload = verifyJwt<{ sub: number; exp: number; role: 'admin' | 'user' }>(token)

			if (Date.now() > payload.exp * 1000) {
				return res.status(401).send(['Token expired'])
			}

			const { title, price, description } = req.body as {
				title: string
				price: number
				description: string
			}
			const image = req.file!

			if (!title || !price || !description || !image) {
				return res.status(400).send(['Missing required fields'])
			}

			await create({ description, price, title, image })

			return res.status(201).send({ message: 'Product created successfully' })
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

router.put(
	'/products/update',
	[
		body('id')
			.notEmpty()
			.withMessage('id is required')
			.bail()
			.custom(async (value) => {
				if (value === 0) {
					throw new Error("price can't be zero")
				}
			})
			.bail(),
		body('title')
			.notEmpty()
			.withMessage("product name can't be empty")
			.bail()
			.isString()
			.withMessage('product name should be a string')
			.bail(),
		body('description')
			.notEmpty()
			.withMessage("description can't be empty")
			.bail()
			.isString()
			.withMessage('description should be a string')
			.bail(),
		body('price')
			.notEmpty()
			.withMessage('price is required')
			.bail()
			.isNumeric()
			.withMessage('price should be a number')
			.bail(),
	],
	async (req: express.Request, res: express.Response) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				const error = errors.array().map((e) => e.msg)
				return res.status(400).json(error)
			}

			const token = req.headers.authorization?.split(' ')[1] ?? ''
			const payload = verifyJwt<{ sub: number; exp: number; role: 'admin' | 'user' }>(token)

			if (Date.now() > payload.exp * 1000) {
				return res.status(401).send(['token expired'])
			}

			const { id, title, description, price, image } = req.body

			await update({ id, title, description, price, image })

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

router.put(
	'/products/delete',
	body('id')
		.notEmpty()
		.withMessage('id is required')
		.bail()
		.isNumeric()
		.withMessage('id should be a number')
		.bail()
		.custom(async (value) => {
			if (value === 0) throw new Error("id can't be zero")
			if (value === '0') throw new Error("id can't be zero")
		}),
	async (req: express.Request, res: express.Response) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				const error = errors.array().map((e) => e.msg)
				return res.status(400).json(error)
			}

			const token = req.headers.authorization?.split(' ')[1] ?? ''
			const payload = verifyJwt<{ sub: number; exp: number; role: 'admin' | 'user' }>(token)

			if (Date.now() > payload.exp * 1000) {
				return res.status(401).send(['token expired'])
			}

			const { id } = req.body

			await cancel(Number(id))

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }
