interface UserLogin {
	email: string
	password: string
	role: Role
}

interface UserRegister {
  name: string
	email: string
	password: string
	role: Role
}

type Role = 'user' | 'admin'
