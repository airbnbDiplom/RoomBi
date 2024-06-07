'use client'
import React, { useEffect } from 'react'
import HeaderForEdit from './headerForEdit'
import TextApartment from './textApartment'
import { newApartment } from '@/app/type/type'
import { useAppDispatch } from '@/app/redux/hook'
import { setApartment } from '@/app/redux/updateApartment/updateApartmentSlice'
import ImageEdit from './imageEdit/imageEdit'
interface props {
	apartmentData: newApartment
}

const Main: React.FC<props> = ({ apartmentData }) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(setApartment(apartmentData))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<HeaderForEdit />
			<ImageEdit />
			<TextApartment />
		</>
	)
}

export default Main
