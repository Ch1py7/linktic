import { Auth } from './auth'
import { Products } from './products'
import { Orders } from './orders'
import { Users } from './users'

export namespace Supabase {
  export const auth = Auth
  export const products = Products
  export const orders = Orders
  export const users = Users
}
