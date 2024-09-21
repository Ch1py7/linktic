import { totals } from './stores/totals'

export const numberValidator = (event: Event) => {
	const input = event.target as HTMLInputElement
	input.value = input.value.replace(/[^0-9]/g, '')

	return Number(input.value) || 0
}

export const manageTotals = (cart: ProductQuantity[]) => {
	const { newTotalProducts, newTotalOrder } = cart.reduce(
		(totals, product) => {
			totals.newTotalProducts += product.quantity
			totals.newTotalOrder += product.price * product.quantity
			return totals
		},
		{ newTotalProducts: 0, newTotalOrder: 0 }
	)

	const newTotals = {
		totalOrder: newTotalOrder,
		totalProducts: newTotalProducts,
	}

	totals.set({ ...newTotals, individualTotal: cart })
}
