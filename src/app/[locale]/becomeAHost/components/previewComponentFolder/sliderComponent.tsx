import { newApartment } from '@/app/type/type'
import React from 'react'
import style from './previewComponent.module.css'
import { Carousel } from 'react-bootstrap'
import Image from 'next/image'
interface props {
	obj: newApartment
}

const SliderComponent: React.FC<props> = ({ obj }) => {
	return (
		<Carousel className={style.slider}>
			{obj.pictureFile.map((item, index) => {
				if (item)
					return (
						<Carousel.Item key={index}>
							<Image
								className={style.image}
								src={item}
								width={100}
								height={100}
								alt={`picture${index}`}
							/>
						</Carousel.Item>
					)
			})}
		</Carousel>
	)
}

export default SliderComponent
