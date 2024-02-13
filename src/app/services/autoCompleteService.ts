import { AutoCompleteList } from '@/app/type/type'
const autoCompleteService = async (inputString: string) => {
	//const urlSearch = process.env.NEXT_AUTOCOMPLETE
	const urlSearch = 'https://nominatim.openstreetmap.org/search?'
	if (urlSearch === undefined) return null

	const queryParams = new URLSearchParams({
		q: inputString,
		format: 'geojson',
		limit: '6',
	})

	try {
		const response = await fetch(`${urlSearch}${queryParams.toString()}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data: AutoCompleteList = await response.json()
		return data
	} catch (e) {
		console.error('Could not fetch data:', e)
		return null
	}
}
export default autoCompleteService
