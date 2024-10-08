import { writable } from 'svelte/store'

export const navigationAdmin = writable<Navigation>({
	users: {
		state: true,
		subnavigation: {
			list: true,
			create: false,
		},
	},
	products: {
		state: false,
		subnavigation: {
			create: false,
			list: false,
		},
	},
	orders: {
		state: false,
		subnavigation: {
			create: false,
			list: false,
		},
	},
})

interface Navigation {
	users: {
		state: boolean
		subnavigation: Subnavigation
	}
	products: {
		state: boolean
		subnavigation: Subnavigation
	}
	orders: {
		state: boolean
		subnavigation: Subnavigation
	}
}

interface Subnavigation {
	list: boolean
	create: boolean
}
