interface User {
	name: string
	email: string
	password: string
	role: Role
}

interface Product {
	id?: number
	title: string
	description: string
	price: number
	image: string
}

interface Orders {
	status: boolean
	order_id: number
	order_products: OrderProducts[]
}

interface OrderProducts {
	title: string
	product_id: number
	quantity: number
}

interface ProductQuantity extends Product {
	quantity: number
}

interface ChangeEvent extends Event {
	target: HTMLInputElement & EventTarget
}

type Role = 'user' | 'admin'
