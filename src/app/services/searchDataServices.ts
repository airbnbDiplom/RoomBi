'use server'
import { DataSearchForSorting } from '../type/type'
const searchDataService = async (data: DataSearchForSorting) => {
	const urlSearch = process.env.NEXT_GET_SEARCH_DATA
	console.log('urlSearch', urlSearch)
	if (urlSearch === undefined) return null

	try {
		const response = await fetch(urlSearch, {
			method: 'POST',
			cache: 'no-store',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const searchDataList: any = await response.json()

		return searchDataList
	} catch (e) {
		console.error('Could not fetch data:', e)
		return null
	}
}
export default searchDataService
