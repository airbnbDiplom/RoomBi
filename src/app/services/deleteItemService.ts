export const deleteItemService = async (itemId: number) => {
	try {
		const url = `https://roombiserver.azurewebsites.net/api/RentalApartment/${itemId}`

		if (url) {
			const res = await fetch(url, {
				method: 'DELETE',
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!res.ok) {
				return res.status
			}
			return res.status
		}
	} catch (e) {
		return null
	}
}
