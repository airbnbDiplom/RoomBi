import { cookies } from 'next/headers'
import {
	addressAutoComplete,
	inputAutoComplete,
} from '@/app/services/autoCompleteService'
import style from '../addApart.module.css'
import InputComponent from '../components/addressPageComponent/inputComponent'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
export interface TempAddress {
	country: string
	city: string
	street: string
	buildingNumber: string
	apartmentNumber: string
}

const AddressOfHome = () => {
	const MapContainerComponent = useMemo(
		() =>
			dynamic(
				() =>
					import(
						'@/app/[locale]/becomeAHost/components/addressPageComponent/mapContainer'
					).then(mod => mod.default),
				{
					// loading: () => <Loading />,
					ssr: false,
				}
			),
		[]
	)
	return (
		<div className={`${style.wrapper} ${style.flexRow}`}>
			<div className={`${style.center} ${style.flexRow}`}>
				<InputComponent
					autoCompleteFunc={inputAutoComplete}
					placeHolder={'country'}
				/>
				<InputComponent
					autoCompleteFunc={inputAutoComplete}
					placeHolder={'administrative'}
				/>
				<InputComponent
					autoCompleteFunc={inputAutoComplete}
					placeHolder={'city'}
				/>
				<InputComponent
					autoCompleteFunc={addressAutoComplete}
					placeHolder={'address'}
				/>
			</div>
			<MapContainerComponent />
		</div>
	)
}
export default AddressOfHome
