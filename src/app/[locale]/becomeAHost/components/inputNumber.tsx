'use client'
import {
	setApartNum,
	setHouseNum,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import { useAppDispatch } from '@/app/redux/hook'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../addApart.module.css'
interface propsInput {
	placeholder: string
}

const InputNumber: React.FC<propsInput> = ({ placeholder }) => {
	const { t } = useTranslation()
	const [value, setValue] = useState('')
	const dispatch = useAppDispatch()
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setValue(value)
	}
	useEffect(() => {
		if (placeholder === 'house') {
			dispatch(setHouseNum(value))
		}
		if (placeholder === 'apartNum') {
			dispatch(setApartNum(value))
		}
	}, [dispatch, placeholder, value])

	return (
		<input
			className={style.input}
			type='text'
			placeholder={t(placeholder)}
			value={value}
			onChange={changeHandler}
		/>
	)
}

export default InputNumber
