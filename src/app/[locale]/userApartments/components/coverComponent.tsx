'use client'
import React from 'react'
import Image from 'next/image'
interface Props {
	pictures?: string
}
const CoverComponent: React.FC<Props> = ({ pictures }) => {
	const fileURL = 'https://roombi.space/Car/'
	return (
		<Image
			src={fileURL + pictures}
			width={300}
			height={250}
			alt='pictureObject'
		/>
	)
}

export default CoverComponent
