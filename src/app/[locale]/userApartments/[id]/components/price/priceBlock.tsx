'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setPriceEditEdit } from '@/app/redux/updateApartment/updateApartmentSlice'
import { use, useEffect, useState } from 'react'
import FormRange from 'react-bootstrap/FormRange'
import style from '../../edit.module.css'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
const PriceBlock = () => {
	const priceState = useAppSelector(
		state => state.updateApartmentSlice.pricePerNight
	)
	const { t } = useTranslation()
	const [price, setPrice] = useState(priceState)
	const dispatch = useAppDispatch()
	useEffect(() => {
		setPrice(priceState)
	}, [priceState])
	useEffect(() => {
		dispatch(setPriceEditEdit(price))
	}, [dispatch, price])
	return (
		<div className={style.priceBlock}>
			<Form.Label>{t('userApartmentsEdit_priceEditHeader')}</Form.Label>
			<div className={style.priceBlock_priceInput}>
				<span>$</span>
				<Form.Control
					type='text'
					id='inputPassword5'
					aria-describedby='passwordHelpBlock'
					value={price}
					onChange={e => {
						const int = parseFloat(e.currentTarget.value)
						if (int > 0) setPrice(int)
					}}
				/>
			</div>
			<FormRange
				className={style.range}
				min={1}
				max={1000}
				value={price}
				onChange={e => setPrice(parseFloat(e.currentTarget.value))}
			></FormRange>
		</div>
	)
}

export default PriceBlock
