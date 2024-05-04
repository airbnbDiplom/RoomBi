'use client'
import { setTitle } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import React, { useEffect, useState } from 'react'

import style from './description.module.css'
import { useTranslation } from 'react-i18next'

const TitleInput = () => {
	const { t } = useTranslation()
	const valueInState = useAppSelector(state => state.newApartmentReducer.title)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(valueInState)
	const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null)
	const [timer, setTimer] = useState(true)

	const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTimer(false)
		setValue(event.currentTarget.value)

		//	debouncedDispatch(event.currentTarget.value)
	}
	useEffect(() => {
		if (!timer) {
			setTimer(true)
			if (timeOutId) {
				clearTimeout(timeOutId)
			}
			const newTimeOutId = setTimeout(() => {
				dispatch(setTitle(value))
			}, 500)
			setTimeOutId(newTimeOutId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])
	return (
		<input
			className={style.textInput}
			type='text'
			value={value}
			onChange={handlerChange}
			placeholder={t('description_titlePlaceholder')}
		/>
	)
}

export default TitleInput
