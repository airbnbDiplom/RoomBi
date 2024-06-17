export const addPictureJfObject = async (
	pictureFile: string,
	picturesName: string
) => {
	try {
		let url = process.env.NEXT_SAVE_FOTO
		if (!url) url = 'https://roombi.space/'
		if (!url) {
			throw new Error('URL is undefined.')
		}

		// Decode the base64 string to binary data
		const binaryData = atob(pictureFile.split('base64,')[1]) // Ensure to remove the base64 prefix if present
		const byteNumbers = new Array(binaryData.length)
		for (let i = 0; i < binaryData.length; i++) {
			byteNumbers[i] = binaryData.charCodeAt(i)
		}
		const byteArray = new Uint8Array(byteNumbers)

		// Create a blob from the binary data
		const blob = new Blob([byteArray], { type: 'text/plain' })

		// Create a FormData object and append the Blob as 'file'
		const formData = new FormData()
		formData.append('uploadPic', blob, picturesName)
		const response = await fetch(url, {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
			},
		})

		console.log('HTTP error: status', response.status)
		if (!response.ok) throw new Error('Unable send picture.')
		if (response.ok) {
			console.error('HTTP ok:')
		} else {
			console.error('HTTP error:', response.status)
		}
	} catch (error) {
		console.error('Fetch error:', error)
	}
}
