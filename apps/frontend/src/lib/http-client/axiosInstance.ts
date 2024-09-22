import axios from 'axios'

export const instance = axios.create({
	baseURL: 'http://linktic.onrender.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
})