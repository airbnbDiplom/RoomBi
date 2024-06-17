'use client'
import React, { useEffect } from 'react'
import HeaderForEdit from './headerForEdit'
import TextApartment from './textApartment'
import { newApartment } from '@/app/type/type'
import { useAppDispatch } from '@/app/redux/hook'
import { setApartment } from '@/app/redux/updateApartment/updateApartmentSlice'
import ImageEdit from './imageEdit/imageEdit'
import CalendarBlock from './calendar/calendarBlock'
import AmenitiesBlock from './amenities/amenitiesBlock'
import CounterEdit from './counter/counterEdit'
import { log } from 'console'
import SwitchBlock from './switch/switchBlock'
import AddressBlock from './address/addressBlock'
interface props {
	apartmentData: newApartment
}

const MyMain: React.FC<props> = ({ apartmentData }) => {
	const dispatch = useAppDispatch()
	console.log('apartmentData', apartmentData)
	useEffect(() => {
		dispatch(setApartment(apartmentData))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<HeaderForEdit />
			<ImageEdit />
			<TextApartment />
			<AmenitiesBlock />
			<SwitchBlock />
			<CounterEdit />
			<CalendarBlock />
			<AddressBlock />
		</>
	)
}

export default MyMain
