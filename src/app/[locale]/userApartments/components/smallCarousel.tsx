import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-bootstrap'
import style from '../userApartments.module.css'
import { dark } from '@mui/material/styles/createPalette'
interface Props {
	pictures?: string[]
}
const SmallCarousel: React.FC<Props> = ({ pictures }) => {
	// Check if the environment variable is set
	const fileURL = 'https://roombi.space/' + 'Car/'
	//process.env.NEXT_SAVE_FOTO

	return (
		<Carousel fade indicators={false} variant={'dark'}>
			{pictures &&
				pictures.map((item, index) => (
					<Carousel.Item key={index}>
						<Image
							src={fileURL + item}
							width={300}
							height={250}
							alt='pictureObject'
						/>
					</Carousel.Item>
				))}
		</Carousel>
	)
}
export default SmallCarousel
