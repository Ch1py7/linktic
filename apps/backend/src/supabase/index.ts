import { Auth } from './cases/auth'
import { Products } from './cases/products'
import { Orders } from './cases/orders'
import { Users } from './cases/users'
import { Relations } from './cases/relations'

export namespace Supabase {
	export const auth = Auth
	export const products = Products
	export const orders = Orders
	export const users = Users
	export const relations = Relations
}
