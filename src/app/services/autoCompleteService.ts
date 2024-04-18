'use server'

import {
	AutoCompleteItem,
	AutoCompleteList,
	autoCompleteObj,
} from '@/app/type/type'
//const urlSearch = process.env.NEXT_AUTOCOMPLETE
const urlSearch = 'https://nominatim.openstreetmap.org/search?'
export const autoCompleteService = async (
	inputString: string,
	locale: string = 'en'
) => {
	const queryParams = new URLSearchParams({
		q: inputString,
		addressdetails: '1',
		format: 'jsonv2',
		limit: '6',
	})

	try {
		const response = await fetch(`${urlSearch}${queryParams.toString()}`, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': locale,
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data: AutoCompleteItem[] = await response.json()
		return data
	} catch (e) {
		console.error('Could not fetch data:', e)
		return null
	}
}

export const inputAutoComplete = async (
	inputString: string,
	locale: string = 'en',
	countryCode: string = '',
	county: string = ''
) => {
	const queryParams = new URLSearchParams({
		q: inputString,
		featureType: 'country',
		addressdetails: '1',
		format: 'json',
		limit: '3',
	})
	if (countryCode !== '') {
		queryParams.delete('featureType')
		queryParams.append('countrycodes', countryCode)
		queryParams.append('featureType', 'state')
	}
	if (county !== '') {
		queryParams.delete('q')
		queryParams.delete('featureType')
		queryParams.append('city', inputString)
		queryParams.append('county', county)
		queryParams.append('layer', 'address')
	}

	try {
		console.log(`${urlSearch}${queryParams}`)
		const response = await fetch(`${urlSearch}${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': locale,
			},
		})
		if (!response) {
			console.log('bad response')
			return null
		}
		const data: autoCompleteObj[] = await response.json()

		console.log(data)
		return data
	} catch (error) {
		console.error('Could not fetch data:', error)
		return null
	}
}
export const addressAutoComplete = async (
	inputString: string,
	locale: string = 'en',
	country: string = '',
	county: string = '',
	city: string = ''
) => {
	const queryParams = new URLSearchParams({
		street: inputString,
		// addressdetails: '1',
		//	format: 'json',
		// limit: '3',
	})

	if (city !== '') {
		queryParams.append('city', city)
	}
	if (county !== '') {
		queryParams.append('county', county)
	}
	if (country !== '') {
		queryParams.append('country', country)
	}
	queryParams.append('format', 'json')
	try {
		console.log(`${urlSearch}${queryParams}`)
		const response = await fetch(`${urlSearch}${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': locale,
			},
		})
		if (!response) {
			console.log('bad response')
			return null
		}
		const data: autoCompleteObj[] = await response.json()

		console.log(data)
		return data
	} catch (error) {
		console.error('Could not fetch data:', error)
		return null
	}
}
