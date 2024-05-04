'use client'
import React, { useState } from 'react'
import style from './pricePage.module.css'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setPrice } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

const PriceCountComponent = () => {
	const priceInState = useAppSelector(
		state => state.newApartmentReducer.pricePerNight
	)
	const [value, setValue] = useState(
		priceInState === 0 ? '1' : priceInState.toString()
	)

	const dispatch = useAppDispatch()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.currentTarget.value
		if (!Number(val)) {
			return
		}
		setValue(val)
		dispatch(setPrice(Number(val)))
	}
	const changeValue = (operator: boolean) => {
		if (!Number(value)) {
			return
		}

		let newNumber = 1
		if (!operator) {
			if (Number(value) - 1 < 1) {
				return
			}
			newNumber = Number(value) - 1
		}
		if (operator) newNumber = Number(value) + 1
		setValue(newNumber.toString())
		dispatch(setPrice(newNumber))
	}

	return (
		<div className={style.counterContainer}>
			<div
				className={`${style.arrow} ${style.arrowUp}`}
				onClick={() => {
					changeValue(true)
				}}
			>
				<Image src='/icon/next.svg' alt='price' width={20} height={20} />
			</div>
			<div className={style.insideContainer}>
				<span>$</span>
				<input
					className={style.inputCounter}
					type='text'
					value={value}
					onChange={handleChange}
				/>
			</div>
			<div
				className={`${style.arrow} ${style.arrowDown}`}
				onClick={() => {
					changeValue(false)
				}}
			>
				<Image src='/icon/next.svg' alt='price' width={20} height={20} />
			</div>
		</div>
	)
}

export default PriceCountComponent
