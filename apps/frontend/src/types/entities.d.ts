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

interface ProductQuantity extends Product {
	quantity: number
}

interface ChangeEvent extends Event {
	target: HTMLInputElement & EventTarget
}

type Role = 'user' | 'admin'
