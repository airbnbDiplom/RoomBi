'use server'

import { RentalApartmentDTOForStartPage } from '../type/type'

export const getUserApartmentsListService = async (userId: number) => {
	try {
		let url = `https://roombiserver.azurewebsites.net/api/RentalApartment/masterobj?idMaster=${userId}`
		// 	;`https://rombiserv.azurewebsites.net/api/RentalApartment/masterobj?idMaster=${userId}`
		//`https://localhost:7158/api/RentalApartment/masterobj?idMaster=${userId}
		console.log('url', url)
		// if (!url) {
		// 	// url = `https://roombiserver.azurewebsites.net/api/RentalApartment/masterobj?idMaster=${userId}`
		// 	;`https://rombiserv.azurewebsites.net/api/RentalApartment/masterobj?idMaster=${userId}`
		//`https://localhost:7158/api/RentalApartment/masterobj?idMaster=${userId}`
		// }

		if (url === undefined) {
			console.log('url undefined')
			return null
		}
		const response = await fetch(url, {
			method: 'POST',
			cache: 'no-store',
			headers: {
				Accept: 'application/json',
			},
		})

		if (!response.ok) throw new Error('Unable to fetch Apartments.')
		if (response.ok) {
			const responseData: RentalApartmentDTOForStartPage[] =
				await response.json()
			return responseData
		} else {
			console.error('HTTP error:', response.status)
		}
	} catch (error) {
		console.error('Fetch error:', error)
	}
}
