export const setSession = (user: Omit<User, 'password' | 'name'>) => {
	sessionStorage.setItem('role', user.role)
	sessionStorage.setItem('email', user.email)
}

export const getSession = () => {
	const email = sessionStorage.getItem('email')
	const role = sessionStorage.getItem('role')
	return { email, role }
}

export const removeSession = () => {
	sessionStorage.removeItem('role')
	sessionStorage.removeItem('email')
}
