import {
	setAddress,
	setBoundingbox,
	setCity,
	setCityPlaceId,
	setCoordinate,
	setCountry,
	setCountryCode,
	setCounty,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import { useAppDispatch } from '@/app/redux/hook'
import { autoCompleteObj } from '@/app/type/type'
import style from '../../addApart.module.css'

import React from 'react'

interface autoCompleteProps {
	setAutoCompleteVariant: React.Dispatch<
		React.SetStateAction<autoCompleteObj[] | null>
	>
	setInputValue: React.Dispatch<React.SetStateAction<string>>
	arr: autoCompleteObj[]
	setTimer: React.Dispatch<React.SetStateAction<boolean>>
	placeHolder: string
}

const AutoCompleteVariant: React.FC<autoCompleteProps> = ({
	arr,
	setAutoCompleteVariant,
	setInputValue,
	setTimer,
	placeHolder,
}) => {
	const dispatch = useAppDispatch()

	return (
		<div className={style.autoComplete}>
			{arr.map(item => (
				<div
					key={item.place_id}
					onClick={() => {
						if (placeHolder === 'administrative') {
							dispatch(setCounty(item.name))
							dispatch(setBoundingbox(item.boundingbox))
						}
						if (placeHolder === 'city') {
							dispatch(setCity(item.name))
							dispatch(setBoundingbox(item.boundingbox))
							dispatch(setCityPlaceId(item.place_id))
						}
						if (placeHolder === 'country') {
							dispatch(setCountry(item.name))
							dispatch(setCountryCode(item.address.country_code))
							dispatch(setBoundingbox(item.boundingbox))
						}
						if (placeHolder === 'address') {
							dispatch(setAddress(item.name))
							dispatch(setCoordinate({ lat: item.lat, lon: item.lon }))
						}
						setInputValue(item.name)
						setAutoCompleteVariant(null)
						setTimer(true)
					}}
				>
					{placeHolder === 'city'
						? item.address?.district !== undefined
							? `	${item.name} ${item.address?.district}`
							: item.name
						: item.name}
				</div>
			))}
		</div>
	)
}

export default AutoCompleteVariant
