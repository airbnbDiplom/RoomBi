'use client'
import React from 'react'
import VariantOfApartmentItem from './variantOfApartmentItem'
import AddActivePropsHoc, { InjectProps } from './addActivePropsHoc'
import style from '../addApart.module.css'
import { useTranslation } from 'react-i18next'
export interface ApartmentsVariant {
	id: number
	title: string
	subTitle: string
	imgPath: string
	ukName: string
}

const apartmentVariant: ApartmentsVariant[] = [
	{
		id: 1,
		title: 'fullApartment',
		subTitle: 'fullApartmentSubtitle',
		imgPath: '/icon/fullHouse.svg',
		ukName: 'Все житло',
	},
	{
		id: 2,
		title: 'room',
		subTitle: 'getsHave',
		imgPath: '/icon/room.svg',
		ukName: 'Кімната',
	},
	{
		id: 3,
		title: 'commonRoom',
		subTitle: 'commonRoomSubTitle',
		imgPath: '/icon/commonRoom.svg',
		ukName: 'Спільна кімната',
	},
]

const ApartmentsVariantList: React.FC<InjectProps> = ({
	activeItemId,
	setActiveItemId,
}) => {
	const { t } = useTranslation()
	return (
		<div className={`${style.blockPosition} ${style.center} ${style.flexRow}`}>
			<h1>{t('ApartmentVariantH1')}</h1>
			{apartmentVariant.map(item => (
				<VariantOfApartmentItem
					item={item}
					key={item.id}
					activeItemId={activeItemId}
					setActiveItemId={setActiveItemId}
				/>
			))}
		</div>
	)
}

export default AddActivePropsHoc(ApartmentsVariantList)
