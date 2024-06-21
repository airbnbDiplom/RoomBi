'use client'
import React, { use, useEffect } from 'react'
import HeaderForEdit from './headerForEdit'
import TextApartment from './textApartment'
import { MasterForApartmentPage, newApartment } from '@/app/type/type'
import { useAppDispatch } from '@/app/redux/hook'
import {
	setApartment,
	setMasterIdForEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import ImageEdit from './imageEdit/imageEdit'
import CalendarBlock from './calendar/calendarBlock'
import AmenitiesBlock from './amenities/amenitiesBlock'
import CounterEdit from './counter/counterEdit'

import SwitchBlock from './switch/switchBlock'
import AddressBlock from './address/addressBlock'
import PriceBlock from './price/priceBlock'
interface props {
	apartmentData: newApartment
	apartmentId: string
}

const MyMain: React.FC<props> = ({ apartmentData, apartmentId }) => {
	const dispatch = useAppDispatch()
	console.log('apartmentData', apartmentData)
	useEffect(() => {
		dispatch(setApartment(apartmentData))
		const userID = (apartmentData as any).master as MasterForApartmentPage
		if (userID !== undefined) {
			dispatch(setMasterIdForEdit(userID.id.toString()))
		}
	}, [apartmentData, dispatch])

	return (
		<>
			<HeaderForEdit apartmentId={apartmentId} />
			<ImageEdit />
			<TextApartment />
			<AmenitiesBlock />
			<SwitchBlock />
			<CounterEdit />
			<CalendarBlock />
			<PriceBlock />
			<AddressBlock />
		</>
	)
}

export default MyMain
