import { cancel } from '@/functions/orders/cancel-order'
import { create } from '@/functions/orders/create-order'
import { get } from '@/functions/orders/get-order'
import { update } from '@/functions/orders/update-order'
import { verifyJwt } from '@/functions/service/jwt'
import express from 'express'
import { body, query, validationResult } from 'express-validator'

const router = express.Router()

router.get('/orders', async (req: express.Request, res: express.Response) => {
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

		let orders: ParsedOrders[]

		if (payload.role === 'user') {
			orders = await get(payload.sub)
		} else if (payload.role === 'admin') {
			orders = await get()
		} else {
			return res.status(401)
		}

		res.status(200).send(orders)
	} catch (e) {
		res.status(400).send([(e as Error).message])
	}
})

router.post(
	'/order/create',
	[
		body('products')
			.isArray()
			.withMessage('products should be an array')
			.custom(async (value: OrderProducts[]) => {
				if (value.length === 0) throw new Error('send at least one product')
				value.map((v) => {
					if (v.product_id === 0) throw new Error("product id can't be 0")
					if (typeof v.product_id !== 'number') throw new Error('product id should be a number')
					if (v.quantity === 0) throw new Error("quantity can't be 0")
					if (typeof v.quantity !== 'number') throw new Error('quantity should be a number')
				})
			}),
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

			const { products } = req.body

			await create({ products, user_id: payload.sub })

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

			const { id } = req.query

			await cancel(Number(id))

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

router.put(
	'/order/update',
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

			await update(id)

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }

interface ParsedOrders {
	order_id: number
	status: boolean
	order_products: {
		title: string
		product_id: number
		quantity: number
	}[]
}
