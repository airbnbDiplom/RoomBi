'use client'
import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { autoCompleteObj } from '@/app/type/type'
import AutoCompleteVariant from './autoCompleteVariant'
import { useAppSelector } from '@/app/redux/hook'

interface InputProps {
	autoCompleteFunc: (
		arg0: string,
		arf1: string,
		arf2?: string,
		arf3?: string,
		arf4?: string,
		arf5?: string
	) => Promise<autoCompleteObj[] | null>
	placeHolder: string
}

const InputComponent: React.FC<InputProps> = ({
	autoCompleteFunc,
	placeHolder,
}) => {
	const { t } = useTranslation()

	const [inputValue, setInputValue] = useState('')
	const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null)
	const [autoCompleteVariant, setAutoCompleteVariant] = useState<
		autoCompleteObj[] | null
	>(null)

	const [timer, setTimer] = useState(true)
	const countryCode = useAppSelector(
		state => state.newApartmentReducer.countryCode
	)
	const county = useAppSelector(state => state.newApartmentReducer.county)
	const country = useAppSelector(state => state.newApartmentReducer.country)
	const city = useAppSelector(state => state.newApartmentReducer.city)
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTimer(false)
		const value = event.target.value
		setInputValue(value)
	}

	useEffect(() => {
		if (!timer) {
			setTimer(true)
			if (timeOutId) {
				clearTimeout(timeOutId)
			}
			const newTimeOutId = setTimeout(() => {
				if (placeHolder === 'country') {
					autoCompleteFunc(placeHolder, inputValue, t('locale')).then(data => {
						setAutoCompleteVariant(data)
						console.log('returnObj', data)
					})
				} else if (placeHolder === 'administrative') {
					console.log('inputValue', inputValue)
					autoCompleteFunc(
						placeHolder,
						inputValue,
						t('locale'),
						countryCode
					).then(data => {
						setAutoCompleteVariant(data)

						console.log('returnObj', data)
					})
				} else if (placeHolder === 'city') {
					autoCompleteFunc(
						placeHolder,
						inputValue,
						t('locale'),
						countryCode,
						county
					).then(data => {
						setAutoCompleteVariant(data)
						console.log('returnObj', data)
					})
				} else if (placeHolder === 'address') {
					autoCompleteFunc(
						placeHolder,
						inputValue,
						t('locale'),
						country,
						county,
						city
					).then(data => {
						setAutoCompleteVariant(data)
						console.log('returnObj', data)
					})
				}
			}, 500)
			setTimeOutId(newTimeOutId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue])
	const checkState = (): boolean | undefined => {
		if (placeHolder === 'administrative' && country === '') return true
		if (placeHolder === 'city' && country === '') return true
		if (placeHolder === 'address' && city === '') return true
		return false
	}

	return (
		<div>
			<input
				disabled={checkState()}
				type='text'
				placeholder={t(placeHolder)}
				onChange={changeHandler}
				value={inputValue}
			/>
			{autoCompleteVariant !== null && (
				<AutoCompleteVariant
					placeHolder={placeHolder}
					arr={autoCompleteVariant}
					setInputValue={setInputValue}
					setAutoCompleteVariant={setAutoCompleteVariant}
					setTimer={setTimer}
				/>
			)}
		</div>
	)
}

export default InputComponent
