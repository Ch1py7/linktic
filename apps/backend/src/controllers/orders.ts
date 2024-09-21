import { create, delete_, getAll } from '@/functions/orders'
import express from 'express'
import { body, query, validationResult } from 'express-validator'

const router = express.Router()

router
	.get(
		'/orders',
		query('id')
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
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				const error = errors.array().map((e) => e.msg)
				return res.status(400).json(error)
			}

			const { id } = req.query

			try {
				const orders = await getAll(Number(id))

				res.status(200).send(orders)
			} catch (e) {
				res.status(400).send([(e as Error).message])
			}
		}
	)

	.post(
		'/order/create',
		[
			body('user_id')
				.notEmpty()
				.withMessage('user id is required')
				.bail()
				.isNumeric()
				.withMessage('user id should be a number'),
			body('products')
				.isArray()
				.withMessage('products should be an array')
				.custom(async (value: OrderProducts[]) => {
					value.map((v) => {
						if (v.product_id === 0) throw new Error("product id can't be 0")
						if (typeof v.product_id !== 'number') throw new Error('product id should be a number')
						if (v.quantity === 0) throw new Error("quantity can't be 0")
						if (typeof v.quantity !== 'number') throw new Error('quantity should be a number')
					})
				}),
		],
		async (req: express.Request, res: express.Response) => {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				const error = errors.array().map((e) => e.msg)
				return res.status(400).json(error)
			}

			const { products, user_id } = req.body

			try {
				await create({ products, user_id })

				res.status(201).send()
			} catch (e) {
				res.status(400).send([(e as Error).message])
			}
		}
	)

router.delete(
	'/order/cancel',
	query('id')
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
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { id } = req.query

		try {
			await delete_(Number(id))

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }
