export const numberValidator = (event: Event) => {
	const input = event.target as HTMLInputElement
	input.value = input.value.replace(/[^0-9]/g, '')

	return Number(input.value) || 0
}