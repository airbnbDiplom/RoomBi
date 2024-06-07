'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from '../edit.module.css'

import { useAppSelector } from '@/app/redux/hook'
const SaveBtn = () => {
	const { t } = useTranslation()
	const apartmentData = useAppSelector(state => state.updateApartmentSlice)
	const btnDisable = useAppSelector(state => state.saveBtnSlice.btnState)
	return (
		<button
			className={style.btnSave}
			onClick={() => {
				console.log('apartmentData', apartmentData)
			}}
			disabled={btnDisable}
		>
			{t('userApartmentEdit_save')}
		</button>
	)
}

export default SaveBtn
