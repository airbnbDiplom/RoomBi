import {
	addressAutoComplete,
	inputAutoComplete,
} from '@/app/services/autoCompleteService'
import style from '../addApart.module.css'
import InputComponent from '../components/addressPageComponent/inputComponent'
import initTranslations from '@/app/i18n'
import MapContainerComponent from '../components/addressPageComponent/mapContainer'
import { HomeParams } from '@/app/type/type'
import TranslationsProvider from '@/app/configs/TranslationsProvider'

const i18nNamespaces = ['translation']
export interface TempAddress {
	country: string
	city: string
	street: string
	buildingNumber: string
	apartmentNumber: string
}
export default async function AddressOfHome({
	params: { locale },
}: {
	params: HomeParams
}) {
	const { resources } = await initTranslations(locale, ['translation'])

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
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
		</TranslationsProvider>
	)
}
