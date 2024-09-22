import { getByCredentials} from './login'
import { register} from './register'

export namespace Auth {
	export const Register = register
	export const Login = getByCredentials
}