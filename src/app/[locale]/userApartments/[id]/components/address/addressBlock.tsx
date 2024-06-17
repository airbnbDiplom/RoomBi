'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import style from '../../edit.module.css'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CountryTextInputAuto from './countryInputAuto'
import CityInputText from './cityInputText'
import MapBlock from './mapBlock'
import { useEffect } from 'react'
import { getAddressByLatLng } from '@/app/services/autoCompleteService'
import {
	setCityEdit,
	setCountryCodeEdit,
	setPlaceIdEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import AddressEdit from './addressEdit'

const AddressBlock = () => {
	const lat = useAppSelector(state => state.updateApartmentSlice.latMap)
	const ing = useAppSelector(state => state.updateApartmentSlice.ingMap)
	const addressCurr = useAppSelector(
		state => state.updateApartmentSlice.address
	)
	const city = useAppSelector(state => state.updateApartmentSlice.city)
	const countryCode = useAppSelector(
		state => state.updateApartmentSlice.countryCode
	)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		if (city === '' && lat !== '' && ing !== '') {
			getAddressByLatLng(ing, lat, t('locale')).then(res => {
				if (res?.address.city) {
					console.log('res', res)
					dispatch(setCityEdit(res?.address.city))
					dispatch(setPlaceIdEdit(res?.osm_id))
					if (countryCode === '')
						dispatch(setCountryCodeEdit(res?.address.country_code))
				}
			})
		}
	}, [lat, ing, t, city, countryCode, dispatch])

	return (
		<div className={style.addressEditBlock}>
			<Form.Label>{t('userApartmentsEdit_AddressHeader')}</Form.Label>
			<CountryTextInputAuto />
			<CityInputText />
			<MapBlock />
			<AddressEdit />
		</div>
	)
}

export default AddressBlock
function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}
