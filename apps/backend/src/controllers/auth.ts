import { login, register } from '@/functions/auth'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post(
	'/auth/register',
	[
		body('name').notEmpty().withMessage("name can't be empty"),
		body('password').notEmpty().withMessage("password can't be empty"),
		body('email').notEmpty().withMessage("email can't be empty"),
		body('role').notEmpty().withMessage("role can't be empty"),
		body('role').isIn(['user', 'admin']).withMessage("role can't be different from user or admin"),
	],
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { email, name, password, role } = req.body

		try {
			await register({ email, name, password, role })

			res.status(201).send()
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

router.post(
	'/auth/login',
	[
		body('password').notEmpty().withMessage("password can't be empty"),
		body('email').notEmpty().withMessage("email can't be empty"),
		body('role').notEmpty().withMessage("role can't be empty"),
		body('role').isIn(['user', 'admin']).withMessage("role can't be different from user or admin"),
	],
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const error = errors.array().map((e) => e.msg)
			return res.status(400).json(error)
		}

		const { email, password, role } = req.body

		try {
			const user = await login({ email, password, role })

			res.status(201).send(user)
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }
