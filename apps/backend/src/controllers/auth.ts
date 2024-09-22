import { login } from '@/functions/auth/login'
import { register } from '@/functions/auth/register'
import { validateEmail } from '@/functions/utils/validators'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post(
	'/auth/register',
	[
		body('name')
			.notEmpty()
			.withMessage("name can't be empty")
			.bail()
			.isString()
			.withMessage('name should be a string')
			.bail(),
		body('password')
			.notEmpty()
			.withMessage("password can't be empty")
			.bail()
			.isString()
			.withMessage('password should be a string')
			.bail(),
		body('email')
			.notEmpty()
			.withMessage("email can't be empty")
			.bail()
			.isString()
			.withMessage('email should be a string')
			.bail()
			.custom(async (value) => {
				if (validateEmail(value)) throw new Error('incorrect email')
			})
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
		body('password')
			.notEmpty()
			.withMessage("password can't be empty")
			.bail()
			.isString()
			.withMessage('password should be a string')
			.bail(),
		body('email')
			.notEmpty()
			.withMessage("email can't be empty")
			.bail()
			.isString()
			.withMessage('email should be a string')
			.bail()
			.custom(async (value) => {
				if (validateEmail(value)) throw new Error('incorrect email')
			})
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

		const { email, password, role } = req.body

		try {
			const user = await login({ email, password, role })

			res.status(200).send(user)
		} catch (e) {
			res.status(400).send([(e as Error).message])
		}
	}
)

export { router }
