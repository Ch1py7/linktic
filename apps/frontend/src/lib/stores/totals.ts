import { writable } from 'svelte/store'

export const totals = writable<Totals>({
	totalProducts: 0,
  totalOrder: 0,
  individualTotal: []
})

interface Totals {
	totalProducts: number
	totalOrder: number
	individualTotal: ProductQuantity[]
}
