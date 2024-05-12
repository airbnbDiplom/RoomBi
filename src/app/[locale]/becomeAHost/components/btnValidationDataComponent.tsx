'use client'
import LinkBtn from '@/app/ui/emptyBtn/linkBtn'
import React, { useEffect, useState } from 'react'
import style from '@/app/ui/emptyBtn/linkBtnStyle.module.css'
import { useAppSelector } from '@/app/redux/hook'
import { usePathname } from 'next/navigation'
import { newApartment } from '@/app/type/type'
import { useTranslation } from 'react-i18next'

const BtnValidationDataComponent = ({ pathArr }: { pathArr: string[] }) => {
	const { t } = useTranslation()
	const [disable, setDisable] = useState(false)
	const dataForCheck: newApartment = useAppSelector(
		state => state.newApartmentReducer
	)
	const path = usePathname()
	const currentPath = path.substring(path.lastIndexOf('/'))
	useEffect(() => {
		if (currentPath === pathArr[0]) {
			setDisable(false)
		} else if (currentPath === pathArr[1] && dataForCheck.house) {
			setDisable(false)
		} else if (currentPath === pathArr[2] && dataForCheck.typeApartment) {
			setDisable(false)
		} else if (
			currentPath === pathArr[3] &&
			dataForCheck.address?.length > 0 &&
			dataForCheck.country.length > 0 &&
			dataForCheck.city?.length > 0 &&
			dataForCheck.countryCode?.length > 0 &&
			dataForCheck.latMap !== '' &&
			dataForCheck.ingMap !== ''
		) {
			setDisable(false)
		} else if (currentPath === pathArr[4]) {
			setDisable(false)
		} else if (currentPath === pathArr[5]) {
			setDisable(false)
		} else if (
			currentPath === pathArr[6] &&
			dataForCheck.picturesName.length >= 5
		) {
			setDisable(false)
		} else if (
			currentPath === pathArr[7] &&
			dataForCheck.title.trim().length >= 2 &&
			dataForCheck.description.trim().length >= 10
		) {
			setDisable(false)
		} else if (currentPath === pathArr[8] && dataForCheck.pricePerNight > 0) {
			setDisable(false)
		} else if (currentPath === pathArr[9]) {
			setDisable(false)
		} else {
			setDisable(true)
		}
	}, [
		currentPath,
		dataForCheck.address?.length,
		dataForCheck.city?.length,
		dataForCheck.country.length,
		dataForCheck.countryCode?.length,
		dataForCheck.description,
		dataForCheck.house,
		dataForCheck.location,
		dataForCheck.picturesName.length,
		dataForCheck.pricePerNight,
		dataForCheck.title,
		dataForCheck.typeApartment,
		pathArr,
	])
	return (
		<>
			{!disable ? (
				<LinkBtn
					pathArr={pathArr}
					btnDirection={true}
					BgColor={'#433d35'}
					textColor={'#f8f9fa'}
				/>
			) : (
				<button className={style.btnStyle} disabled>
					{t('select')}
				</button>
			)}
		</>
	)
}

export default BtnValidationDataComponent
