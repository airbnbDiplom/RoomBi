import { newApartment } from '../type/type'

export const addNewApartServes = async (newApart: newApartment) => {
	try {
		const url = ''
		if (url) {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({}),
			})

			if (!res.ok) {
				return null
			}

			return res.status
		}
	} catch (e) {
		return null
	}
}
