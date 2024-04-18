import React, { useEffect } from 'react'
import { ApartmentsVariant } from './apartmentsVariantList'
import { useTranslation } from 'react-i18next'
import { InjectProps } from './addActivePropsHoc'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setTypeApartment } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import style from '../addApart.module.css'
import Image from 'next/image'

interface itemProps {
	item: ApartmentsVariant
}

const VariantOfApartmentItem: React.FC<itemProps & InjectProps> = ({
	item,
	activeItemId,
	setActiveItemId,
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const selectedCurrent = useAppSelector(
		state => state.newApartmentReducer.typeApartment
	)
	useEffect(() => {
		if (selectedCurrent !== undefined && selectedCurrent.id === item.id) {
			setActiveItemId(item.id)
		}
	}, [selectedCurrent, setActiveItemId, item.id])
	const clickHandler = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		setActiveItemId(item.id)
		dispatch(setTypeApartment(item))
	}
	const isActive = activeItemId === item.id
	return (
		<div
			onClick={clickHandler}
			className={`${style.itemAp} ${isActive ? style.active : ''}`}
		>
			<div className={style.insideAp}>
				<h2>{t(item.title)}</h2>
				<p>{t(item.subTitle)}</p>
			</div>

			<Image
				src={item.imgPath}
				width={35}
				height={35}
				alt={`${t(item.title)} icon`}
			/>
		</div>
	)
}

export default VariantOfApartmentItem
