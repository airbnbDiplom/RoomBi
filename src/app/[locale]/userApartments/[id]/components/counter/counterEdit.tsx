'use client'

import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import CounterEditItem from './counterEditItem'
import { useAppSelector } from '@/app/redux/hook'
const CounterEdit = () => {
	const { t } = useTranslation()
	const gests = useAppSelector(
		state => state.updateApartmentSlice.numberOfGuests
	)
	const beds = useAppSelector(state => state.updateApartmentSlice.beds)
	const bedrooms = useAppSelector(state => state.updateApartmentSlice.bedrooms)
	const bathrooms = useAppSelector(
		state => state.updateApartmentSlice.bathrooms
	)

	return (
		<div className={style.counterBlock}>
			<Form.Label>{t('userApartmentsEdit_CounterHeder')}</Form.Label>
			<CounterEditItem
				title={'gests'}
				value={gests}
				maxValue={100}
				minValue={1}
			/>
			<CounterEditItem
				title={'bedrooms'}
				value={bedrooms}
				maxValue={100}
				minValue={1}
			/>
			<CounterEditItem
				title={'beds'}
				value={beds}
				maxValue={100}
				minValue={1}
			/>
			<CounterEditItem
				title={'bathrooms'}
				value={bathrooms}
				maxValue={100}
				minValue={1}
			/>
		</div>
	)
}

export default CounterEdit
