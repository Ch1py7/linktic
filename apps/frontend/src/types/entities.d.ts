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
	image: FormData | string
}

interface AllUsers {
  id: number
  name: string
  role: Role
  edit: boolean
}

interface AllProducts {
	id: number
	title: string
	description: string
	price: number
  edit: boolean
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
