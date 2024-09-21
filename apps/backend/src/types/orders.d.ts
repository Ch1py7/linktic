interface Order {
  order_id?: number
	user_id: number
	products: OrderProducts[]
}

interface OrderProducts {
  product_id: number
  quantity: number
}