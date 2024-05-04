'use client'
import { setDescription } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './description.module.css'
const DescriptionInput = () => {
	const { t } = useTranslation()
	const valueInState = useAppSelector(
		state => state.newApartmentReducer.description
	)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(valueInState)
	const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null)
	const [timer, setTimer] = useState(true)

	const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTimer(false)
		setValue(event.currentTarget.value)
	}
	useEffect(() => {
		if (!timer) {
			setTimer(true)
			if (timeOutId) {
				clearTimeout(timeOutId)
			}
			const newTimeOutId = setTimeout(() => {
				dispatch(setDescription(value))
			}, 500)
			setTimeOutId(newTimeOutId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])
	return (
		<textarea
			className={style.textArea}
			value={value}
			onChange={handlerChange}
			placeholder={t('description_textarea_placeholder')}
		/>
	)
}

export default DescriptionInput
