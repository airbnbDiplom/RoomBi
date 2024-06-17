'use client'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import { inputAutoComplete } from '@/app/services/autoCompleteService'
import { autoCompleteObj } from '@/app/type/type'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { saveBtnToggle } from '@/app/redux/updateApartment/saveBtnSlice'
import {
	setCountryCodeEdit,
	setCountryEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import ValidMassage from './validMassage'
import AutoComplete from './autoComplete'

const CountryTextInputAuto = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const country = useAppSelector(state => state.updateApartmentSlice.country)
	const [changeValue, setChangeValue] = useState('')
	const [valid, setValid] = useState(true)
	const [autoCompleteRes, setAutoCompleteRes] = useState<
		autoCompleteObj[] | null
	>(null)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setChangeValue(newValue)
		inputAutoComplete('country', newValue, t('locale')).then(res => {
			if (res) setAutoCompleteRes(res)
		})
	}
	const handlerDispatch = (item: autoCompleteObj) => {
		if (item) {
			setChangeValue(item?.name)
			dispatch(setCountryEdit(item?.name))
			dispatch(setCountryCodeEdit(item?.address.country_code))
			setAutoCompleteRes(null)
		}
	}
	useEffect(() => {
		setChangeValue(country)
	}, [country])
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
					<Form.Text>
						{t(`userApartmentsEdit_AddressSubHeaderCountry`)}
					</Form.Text>
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

export default CountryTextInputAuto
