'use client'
import Image from 'next/image'

const PlaceImage: React.FC = ({}) => {
	return (
		<Image
			src={'/icon/plus.svg'}
			width={16}
			height={16}
			alt='add picture photo'
		/>
	)
}

export default PlaceImage
