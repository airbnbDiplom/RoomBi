import { NewApartmentOfferedAmenities } from '@/app/type/type'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './amenities.module.css'
import { useAppDispatch } from '@/app/redux/hook'
import { setOfferedAmenities } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

type item = {
	key: string
	value: boolean
	title: string
}
interface amenitiesProps {
	item: item
	amenitiesState: NewApartmentOfferedAmenities
}

const ItemAmenities: React.FC<amenitiesProps> = ({ item, amenitiesState }) => {
	const { t } = useTranslation()
	const [isActive, setIsActive] = useState(item.value)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (amenitiesState.hasOwnProperty(item.key)) {
			const updatedAmenitiesState = { ...amenitiesState, [item.key]: isActive }
			dispatch(setOfferedAmenities(updatedAmenitiesState))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isActive, item.key])
	return (
		<div
			className={isActive ? `${style.active}  ${style.item}` : `${style.item}`}
			onClick={() => {
				setIsActive(!isActive)
			}}
		>
			<Image
				src={`/userInfo/${item.key}.svg`}
				width={30}
				height={30}
				alt={item.title}
			/>
			<p>{t(item.title)}</p>
		</div>
	)
}

export default ItemAmenities
