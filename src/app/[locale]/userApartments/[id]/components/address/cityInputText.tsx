'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import {
	getAddressByLatLng,
	inputAutoComplete,
} from '@/app/services/autoCompleteService'
import { autoCompleteObj } from '@/app/type/type'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import { Form } from 'react-bootstrap'
import ValidMassage from './validMassage'
import AutoComplete from './autoComplete'
import {
	setCityEdit,
	setPlaceIdEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import { saveBtnToggle } from '@/app/redux/updateApartment/saveBtnSlice'

const CityInputText = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const countryCode = useAppSelector(
		state => state.updateApartmentSlice.countryCode
	)
	const city = useAppSelector(state => state.updateApartmentSlice.city)

	const [changeValue, setChangeValue] = useState('')
	const [valid, setValid] = useState(true)
	const [autoCompleteRes, setAutoCompleteRes] = useState<
		autoCompleteObj[] | null
	>(null)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setChangeValue(newValue)
		inputAutoComplete('city', newValue, t('locale'), countryCode).then(res => {
			if (res) setAutoCompleteRes(res)
			console.log('res', res)
		})
	}
	const handlerDispatch = (item: autoCompleteObj) => {
		if (item) {
			setChangeValue(item?.name)
			dispatch(setCityEdit(item?.name))
			dispatch(setPlaceIdEdit(item?.osm_id))
			setAutoCompleteRes(null)
		}
	}

	useEffect(() => {
		setChangeValue(city)
	}, [city])

	useEffect(() => {
		if (changeValue.trim() === '') {
			setValid(false)
			dispatch(saveBtnToggle(true))
		} else {
			setValid(true)
			dispatch(saveBtnToggle(false))
		}
	}, [changeValue, dispatch, t])

	return (
		<div className={style.inputBlock}>
			<Form.Group>
				<Form.Control type='text' value={changeValue} onChange={handleChange} />
				{valid ? (
					<Form.Text>{t(`userApartmentsEdit_AddressSubHeaderCity`)}</Form.Text>
				) : (
					<ValidMassage
						errorMessage={t('userApartmentsEdit_errorFieldIsRequired')}
					/>
				)}
			</Form.Group>
			<AutoComplete
				handlerDispatch={handlerDispatch}
				autoCompleteRes={autoCompleteRes}
			/>
		</div>
	)
}

export default CityInputText
