'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import style from '../../edit.module.css'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CountryTextInputAuto from './countryInputAuto'
import CityInputText from './cityInputText'
import MapBlock from './mapBlock'
import { useEffect, useMemo } from 'react'
import {
	getAddressByLatLng,
	inputAutoComplete,
} from '@/app/services/autoCompleteService'
import {
	setCityEdit,
	setCountryCodeEdit,
	setPlaceIdEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import AddressEdit from './addressEdit'
import dynamic from 'next/dynamic'

const AddressBlock = () => {
	const lat = useAppSelector(state => state.updateApartmentSlice.latMap)
	const ing = useAppSelector(state => state.updateApartmentSlice.ingMap)

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
					dispatch(setCityEdit(res?.address.city))
					if (countryCode === '') {
						dispatch(setCountryCodeEdit(res?.address.country_code))
						inputAutoComplete(
							'city',
							res?.address.city,
							t('locale'),
							countryCode
						).then(res => {
							if (res) {
								dispatch(setPlaceIdEdit(res[0]?.osm_id))
							}
						})
					}
				}
			})
		}
	}, [lat, ing, t, city, countryCode, dispatch])
	const MapBlock = useMemo(
		() =>
			dynamic(() => import('./mapBlock').then(mod => mod.default), {
				// loading: () => <Loading />,
				ssr: false,
			}),
		[]
	)
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
