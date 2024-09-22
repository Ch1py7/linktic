import { verifyJwt } from '@/functions/jwt'
import { delete_, getAll, update } from '@/functions/users'
import express from 'express'
import { body, query, validationResult } from 'express-validator'

const router = express.Router()

router.get('/users', async (req: express.Request, res: express.Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] ?? ''
		const payload = verifyJwt<{ sub: number; exp: number; role: 'admin' | 'user' }>(token)

		if (Date.now() > payload.exp * 1000) {
			return res.status(401).send(['token expired'])
		}

		const users = await getAll()

		res.status(200).send(users)
	} catch (e) {
		res.status(400).send([(e as Error).message])
	}
})

router.delete(
	'/users/delete',
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

			await delete_(Number(id))

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

router.put(
	'/users/update',
	[
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
		body('name')
			.notEmpty()
			.withMessage("name can't be empty")
			.bail()
			.isString()
			.withMessage('name should be a string')
			.bail(),
		body('role')
			.notEmpty()
			.withMessage("role can't be empty")
			.bail()
			.isIn(['user', 'admin'])
			.withMessage("role can't be different from user or admin")
			.bail(),
	],
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { name, id, role } = req.body

		try {
			await update({ name, id, role })

			res.status(200).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }
