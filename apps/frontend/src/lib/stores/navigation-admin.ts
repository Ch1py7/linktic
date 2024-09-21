import { writable } from 'svelte/store'

export const navigationAdmin = writable<Navigation>({
	users: true,
	products: false,
	orders: false,
})

interface Navigation {
	users: boolean
	products: boolean
	orders: boolean
}
