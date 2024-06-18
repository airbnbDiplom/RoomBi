'use client'
import style from '@/app/[locale]/becomeAHost/components/counter/counter.module.css'
import CounterButton from '@/app/[locale]/becomeAHost/components/counter/counterButton'
import { useAppDispatch } from '@/app/redux/hook'
import {
	setBathroomsEdit,
	setBedroomsEdit,
	setBedsEdit,
	setGestsEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
interface ICounterEditItem {
	title: string
	value: number
	maxValue: number
	minValue: number
}

const CounterEditItem: React.FC<ICounterEditItem> = ({
	title,
	value,
	maxValue,
	minValue,
}) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const [counter, setCounter] = useState(value)
	const onClickPlus = () => {
		if (counter < maxValue) {
			setCounter(counter + 1)
		}
	}
	const onClickMinus = () => {
		if (counter > minValue) {
			setCounter(counter - 1)
		}
	}
	useEffect(() => {
		setCounter(value)
	}, [value])
	useEffect(() => {
		if (title === 'gests') {
			dispatch(setGestsEdit(counter))
		} else if (title === 'bedrooms') {
			dispatch(setBedroomsEdit(counter))
		} else if (title === 'beds') {
			dispatch(setBedsEdit(counter))
		} else if (title === 'bathrooms') {
			dispatch(setBathroomsEdit(counter))
		}
	}, [dispatch, title, counter])

	return (
		<div className={style.componentBlock}>
			<p>{t(title)}</p>
			<div className={style.counterBlock}>
				<CounterButton
					onClick={onClickMinus}
					imgPath={`/icon/minus.svg`}
					disable={counter <= minValue}
				/>
				<p>{counter}</p>
				<CounterButton
					onClick={onClickPlus}
					imgPath={`/icon/plus.svg`}
					disable={counter >= maxValue}
				/>
			</div>
		</div>
	)
}

export default CounterEditItem
