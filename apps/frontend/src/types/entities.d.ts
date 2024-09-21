interface User {
  name: string
	email: string
	password: string
	role: Role
}

type Role = 'user' | 'admin'
