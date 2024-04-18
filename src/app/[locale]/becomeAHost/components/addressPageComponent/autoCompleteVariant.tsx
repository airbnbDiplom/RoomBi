import {
	setCity,
	setCountry,
	setCountryCode,
	setCounty,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import { useAppDispatch } from '@/app/redux/hook'
import { autoCompleteObj } from '@/app/type/type'

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
		<div>
			{arr.map(item => (
				<div
					key={item.place_id}
					onClick={() => {
						if (placeHolder === 'administrative') {
							dispatch(setCounty(item.name))
						}
						if (placeHolder === 'city') {
							dispatch(setCity(item.name))
						}
						if (placeHolder === 'country') {
							dispatch(setCountry(item.name))
							dispatch(setCountryCode(item.address.country_code))
						}
						setInputValue(item.name)
						setAutoCompleteVariant(null)
						setTimer(true)
					}}
				>
					{placeHolder === 'city'
						? `	${item.name} ${item.address?.district}`
						: item.name}
				</div>
			))}
		</div>
	)
}

export default AutoCompleteVariant
