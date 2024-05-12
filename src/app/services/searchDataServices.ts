'use server'
debugger
import {
	CardBiProps,
	DataSearchForSorting,
	RentalApartmentDTOForStartPage,
} from '../type/type'
const searchDataService = async (
	data: DataSearchForSorting,
	page = 1,
	pageSize = 8
) => {
	const urlSearch = 'https://localhost:7158//api/DataSearchForSorting/sort'
	//process.env.NEXT_GET_SEARCH_DATA

	if (urlSearch === undefined) return null
	try {
		// const requestData = { ...data, page, pageSize }
		console.log('page', page)
		console.log('pageSize', pageSize)
		console.log('urlSearch', urlSearch)
		const response = await fetch(
			`${urlSearch}?page=${page}&pageSize=${pageSize}`,
			{
				method: 'POST',
				cache: 'no-store',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		)
		if (!response.ok) {
			console.log(`HTTP error! status: ${response.status}`)
			return [] as CardBiProps[]
		}

		const searchDataList: RentalApartmentDTOForStartPage[] =
			await response.json()

		const list: CardBiProps[] = []
		searchDataList.forEach(item => {
			const cardBiPropsItem: CardBiProps = {
				id: item.id,
				title: item.title ?? '',
				country: item.country ?? '',
				bookingFree: item.bookingFree ?? '',
				pictures: item.pictures ?? [],
				pricePerNight: item.pricePerNight,
				objectRating: item.objectRating,
				choiceGuests: false,
				ingMap: item.ingMap ?? '',
				latMap: item.latMap ?? '',
				house: item.house ?? '',
				sport: item.sport ?? '',
				location: item.location ?? '',
				wish: false,
			}
			list.push(cardBiPropsItem)
		})
		console.log('searchDataList', searchDataList)
		return list
	} catch (e) {
		console.error('Could not fetch data:', e)
		return [] as CardBiProps[]
	}
}
export default searchDataService
