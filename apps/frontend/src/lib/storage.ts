import { manageTotals } from './utils'

export const setSession = (user: Omit<User, 'password' | 'name'>) => {
	sessionStorage.setItem('role', user.role)
	sessionStorage.setItem('email', user.email)
}

export const getSession = () => {
	const email = sessionStorage.getItem('email')
	const role = sessionStorage.getItem('role')
	return { email, role }
}

export const removeSession = () => {
	sessionStorage.removeItem('role')
	sessionStorage.removeItem('email')
}

const cartStorageName = 'CartStorageData'
const CartDataStorageInfo: ProductQuantity[] = [
	{
		description: '',
		image: '',
		price: 0,
		quantity: 0,
		title: '',
	},
]

export const createCart = () => {
	_setCartStorage(CartDataStorageInfo)
}

const _setCartStorage = (cart: ProductQuantity[]) => {
	localStorage.setItem(cartStorageName, JSON.stringify(cart))

	manageTotals(cart)
}

export const getCart = (): ProductQuantity[] => {
	const rawCart = localStorage.getItem(cartStorageName) || ''
	if (!rawCart || rawCart === '') {
		createCart()
		return []
	}

	const cart = JSON.parse(rawCart) as ProductQuantity[]
  
	return cart
}

export const manageProducts = (product: ProductQuantity) => {
	const cart = getCart()
	let updatedCart: ProductQuantity[]

	if (cart.length === 0) {
		updatedCart = [product]
	} else {
		const exists = cart.some((p) => p.title === product.title)
		if (!exists) {
			updatedCart = [...cart, product]
		} else {
			const updatedProducts = cart.map((p) => {
				if (p.title === product.title) {
					return { ...p, quantity: p.quantity + 1 }
				}
				return p
			})

			updatedCart = [...updatedProducts]
		}
	}

	_setCartStorage(updatedCart)
}

export const addProduct = (product: Product) => {
	const cart = getCart()
	let updatedCart: ProductQuantity[]

	const productToAdd = cart.map((p) => {
		if (p.title === product.title) {
			return { ...p, quantity: p.quantity + 1 }
		}
		return p
	})

	updatedCart = [...productToAdd]

	_setCartStorage(updatedCart)
}

export const restProduct = (product: Product) => {
	const cart = getCart()
	let updatedCart: ProductQuantity[]

	const productToRest = cart.map((p) => {
		if (p.title === product.title) {
			if (p.quantity > 1) return { ...p, quantity: p.quantity - 1 }
		}
		return p
	})

	updatedCart = [...productToRest]

	_setCartStorage(updatedCart)
}

export const removeProduct = (productTitle: string) => {
	const cart = getCart()
	const productToDelete = cart.findIndex((e) => e.title === productTitle)
	delete cart[productToDelete]
	const newCart: ProductQuantity[] = cart.filter((_, index) => index !== productToDelete)

	_setCartStorage(newCart)
}
