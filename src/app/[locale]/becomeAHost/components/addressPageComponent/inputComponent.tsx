'use client'
import React, { use, useEffect, useRef, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { autoCompleteObj } from '@/app/type/type'
import AutoCompleteVariant from './autoCompleteVariant'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import InfoModal from './InfoModal'
import style from '../../addApart.module.css'
import { setAddress } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

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
	const county = useAppSelector(state => state.newApartmentReducer.county)
	const country = useAppSelector(state => state.newApartmentReducer.country)
	const city = useAppSelector(state => state.newApartmentReducer.city)
	const address = useAppSelector(state => state.newApartmentReducer.address)
	const houseNum = useAppSelector(state => state.newApartmentReducer.houseNum)
	const apartNum = useAppSelector(state => state.newApartmentReducer.apartNum)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const valueInState = (): string => {
		if (placeHolder === 'country' && country?.length > 0) return country
		if (placeHolder === 'administrative' && county?.length > 0) return county
		if (placeHolder === 'city' && city?.length > 0) return city
		if (placeHolder === 'address' && address?.length > 0) return address
		if (placeHolder === 'house' && houseNum?.length > 0) return houseNum
		if (placeHolder === 'apart' && apartNum?.length > 0) return apartNum
		return ''
	}
	const [inputValue, setInputValue] = useState(valueInState())
	const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null)
	const [autoCompleteVariant, setAutoCompleteVariant] = useState<
		autoCompleteObj[] | null
	>(null)
	const [show, setShow] = useState(false)
	const [timer, setTimer] = useState(true)
	const [onClickOnInput, setOnClickToInput] = useState(true)

	const countryCode = useAppSelector(
		state => state.newApartmentReducer.countryCode
	)

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTimer(false)
		const value = event.target.value
		setInputValue(value)
		if (placeHolder === 'address') {
			dispatch(setAddress(value))
		}
	}

	const focusHandler = () => {
		if (placeHolder === 'address') {
			setShow(true)
			setOnClickToInput(false)
		}
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
					})
				} else if (placeHolder === 'administrative') {
					autoCompleteFunc(
						placeHolder,
						inputValue,
						t('locale'),
						countryCode
					).then(data => {
						setAutoCompleteVariant(data)
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
					})
				} else if (placeHolder === 'address') {
					autoCompleteFunc(inputValue, t('locale'), country, county, city).then(
						data => {
							setAutoCompleteVariant(data)
						}
					)
				}
			}, 200)
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
		<>
			<div className={style.question}>
				<input
					autoComplete='off'
					className={style.input}
					id='input'
					{...(placeHolder === 'address' &&
						onClickOnInput && { onFocus: focusHandler })}
					disabled={checkState()}
					type='text'
					onChange={changeHandler}
					value={inputValue}
					placeholder={t(placeHolder)}
				/>

				{autoCompleteVariant !== null && autoCompleteVariant?.length > 0 && (
					<AutoCompleteVariant
						placeHolder={placeHolder}
						arr={autoCompleteVariant}
						setInputValue={setInputValue}
						setAutoCompleteVariant={setAutoCompleteVariant}
						setTimer={setTimer}
					/>
				)}
			</div>
			<InfoModal show={show} setShow={setShow} />
		</>
	)
}

export default InputComponent
