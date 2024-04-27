'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './counter.module.css'
import CounterButton from './counterButton'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import {
	setBathrooms,
	setBedrooms,
	setBeds,
	setGests,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

interface CounterProps {
	title: string
	maxCount: number
	minCount: number
}
const Counter: React.FC<CounterProps> = ({ title, maxCount, minCount }) => {
	const { t } = useTranslation()
	const [counter, setCounter] = useState(1)
	const dispatch = useAppDispatch()
	const guests = useAppSelector(state => state.newApartmentReducer.gests)
	const bedrooms = useAppSelector(state => state.newApartmentReducer.bedrooms)
	const beds = useAppSelector(state => state.newApartmentReducer.beds)
	const bathrooms = useAppSelector(state => state.newApartmentReducer.bathrooms)
	useEffect(() => {
		const veriteToState = () => {
			if (title === 'guests') {
				dispatch(setGests(counter))
			} else if (title === 'bedrooms') {
				dispatch(setBedrooms(counter))
			} else if (title === 'beds') {
				dispatch(setBeds(counter))
			} else if (title === 'bathrooms') {
				dispatch(setBathrooms(counter))
			}
		}
		veriteToState()
	}, [counter, dispatch, title])
	useEffect(() => {
		const getFromState = () => {
			if (title === 'guests') {
				if (guests > 1) setCounter(guests)
			} else if (title === 'bedrooms') {
				if (bedrooms > 0) setCounter(bedrooms)
			} else if (title === 'beds') {
				if (beds > 0) setCounter(beds)
			} else if (title === 'bathrooms') {
				if (bathrooms > 0) setCounter(bathrooms)
			}
		}
		getFromState()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const onClickMinus = () => {
		setCounter(counter - 1)
	}
	const onClickPals = () => {
		setCounter(counter + 1)
	}

	return (
		<div className={style.componentBlock}>
			<p>{t(title)}</p>
			<div className={style.counterBlock}>
				<CounterButton
					onClick={onClickMinus}
					imgPath={`/icon/minus.svg`}
					disable={counter <= minCount}
				/>
				<p>{counter}</p>
				<CounterButton
					onClick={onClickPals}
					imgPath={`/icon/plus.svg`}
					disable={counter >= maxCount}
				/>
			</div>
		</div>
	)
}

export default Counter
