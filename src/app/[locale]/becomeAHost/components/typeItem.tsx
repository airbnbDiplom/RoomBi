'use client'
import React, { useEffect } from 'react'
import style from '../addApart.module.css'
import { FilterLngObj } from '@/app/type/type'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { filterData } from '@/app/startComponents/naw/dataFilter/data'
import { InjectProps } from './addActivePropsHoc'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setHouse } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

interface props {
	item: FilterLngObj
}
const TypeItem: React.FC<props & InjectProps> = ({
	item,
	activeItemId,
	setActiveItemId,
}) => {
	const { t } = useTranslation()
	const { id, nameUa, nameEn, src } = item
	const dispatch = useAppDispatch()
	const selectedCurrent = useAppSelector(
		state => state.newApartmentReducer.house
	)

	useEffect(() => {
		if (selectedCurrent !== undefined && selectedCurrent.id === id) {
			setActiveItemId(id)
		}
	}, [selectedCurrent, setActiveItemId, id])

	const clickHandler = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		setActiveItemId(id)
		dispatch(setHouse(filterData.find(item => item.id === id)))
	}
	const isActive = activeItemId === id
	return (
		<div
			className={`${style.item} ${isActive ? style.active : ''}`}
			onClick={clickHandler}
		>
			<Image
				className={style.Image}
				src={src}
				alt={t('locale') === 'uk' ? nameUa : nameEn}
				width={20}
				height={20}
			/>
			<p>{t('locale') === 'uk' ? nameUa : nameEn}</p>
		</div>
	)
}

export default TypeItem
