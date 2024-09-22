import cors from 'cors'
import express from 'express'

const main = async () => {
	if (process.env.NODE_ENV === 'production') {
		await import('module-alias/register')
	}
	const { router: auth } = await import('@/controllers/auth')
	const { router: products } = await import('@/controllers/products')
	const { router: orders } = await import('@/controllers/orders')
	const { router: users } = await import('@/controllers/users')

	const port = process.env.PORT || 8000
	const app = express()

	app.use(cors({ origin: '*' }))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use('/api', auth)
	app.use('/api', products)
	app.use('/api', orders)
	app.use('/api', users)

	app.listen(port, () => {
		console.log(`Server running on port ${port}`)
	})
}

main()
