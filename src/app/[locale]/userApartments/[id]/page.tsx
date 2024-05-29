import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import style from '../userApartments.module.css'
import { getApartamentId } from '@/app/services/housesServices'
import { RentalApartmentDTO } from '@/app/type/type'

const i18nNamespaces = ['translation']

export default async function UserApartmentsItem({
	params: { locale, id },
}: {
	params: { locale: string; id: string }
}) {
	const { resources } = await initTranslations(locale, ['translation'])
	const hous: RentalApartmentDTO = await getApartamentId(id)
	console.log('hous', hous)

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div className={style.wrapper}>
				{id}
				<div>{hous ? hous.title : 'no data'}</div>
			</div>
		</TranslationsProvider>
	)
}
