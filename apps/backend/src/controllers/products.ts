import { create, delete_, getAll, update } from '@/functions/products'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.get('/products', async (_, res: express.Response) => {
	try {
		const products = await getAll()

		res.status(200).send(products)
	} catch (e) {
		res.status(400).send([(e as Error).message])
	}
})

router.post(
	'/products/create',
	[
		body('title')
			.notEmpty()
			.withMessage("title can't be empty")
			.bail()
			.isString()
			.withMessage('title should be a string')
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
		body('image').notEmpty().withMessage('image is required').bail(),
	],
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { title, description, price, image } = req.body

		try {
			await create({ title, description, price, image })

			res.status(201).send()
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
					throw new Error("id can't be zero")
				}
			})
			.bail(),
		body('title')
			.notEmpty()
			.withMessage("title can't be empty")
			.bail()
			.isString()
			.withMessage('title should be a string')
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
		body('image').notEmpty().withMessage('image is required'),
	],
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { id, title, description, price, image } = req.body

		try {
			await update({ id, title, description, price, image })

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

router.delete(
	'/products/delete',
	body('id')
		.notEmpty()
		.withMessage('id is required')
		.bail()
		.custom(async (value) => {
			if (value === 0) {
				throw new Error("id can't be zero")
			}
		})
		.bail(),
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { id } = req.body

		try {
			await delete_(id)

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }
