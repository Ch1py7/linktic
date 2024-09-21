interface Register {
	email: string
	name: string
	password: string
	role: string
}

interface Login {
	email: string
	password: string
	role: Role
}

type Role = 'admin' | 'user'
