import { writable } from 'svelte/store'

export const navigationMarket = writable<Navigation>({
	products: true,
	orders: false,
	cart: false,
})

interface Navigation {
	products: boolean
	orders: boolean
	cart: boolean
}
