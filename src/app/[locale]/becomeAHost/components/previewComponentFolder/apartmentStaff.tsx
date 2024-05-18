'use client'
import { useAppSelector } from '@/app/redux/hook'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './previewComponent.module.css'

const ApartmentStaff = () => {
	const beds = useAppSelector(state => state.newApartmentReducer.beds)
	const bedrooms = useAppSelector(state => state.newApartmentReducer.bedrooms)
	const gests = useAppSelector(state => state.newApartmentReducer.gests)
	const bathrooms = useAppSelector(state => state.newApartmentReducer.bathrooms)
	const { t } = useTranslation()
	return (
		<div className={style.apartStaff}>
			<p>{`${t('gests')} : ${gests}`} </p>
			<p>{`${t('bedrooms')} : ${bedrooms}`} </p>
			<p>{`${t('beds')} : ${beds}`} </p>
			<p>{`${t('bathrooms')} : ${bathrooms}`} </p>
		</div>
	)
}

export default ApartmentStaff
