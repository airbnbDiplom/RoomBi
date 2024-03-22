'use server'
import { CardBiProps, DataSearchForSorting } from '../type/type'
const searchDataService = async (data: DataSearchForSorting) => {
	console.log('data', data)
	const urlSearch = process.env.NEXT_GET_SEARCH_DATA
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
		const searchDataList: CardBiProps[] = await response.json()
		console.log('searchDataList', searchDataList)
		return searchDataList
	} catch (e) {
		console.error('Could not fetch data:', e)
		return null
	}
}
export default searchDataService
