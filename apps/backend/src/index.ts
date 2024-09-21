import cors from 'cors'
import express from 'express'

const main = async () => {
	if (process.env.NODE_ENV === 'production') {
		await import('module-alias/register')
	}
	const { router: auth } = await import('@/controllers/auth')

	const port = process.env.PORT || 8000
	const app = express()

	app.use(cors({ origin: '*' }))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use('/api', auth)

	app.listen(port, () => {
		console.log(`Server running on port ${port}`)
	})
}

main()
