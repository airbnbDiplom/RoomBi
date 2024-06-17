import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import style from './edit.module.css'
import { getApartamentId } from '@/app/services/housesServices'
import { newApartment } from '@/app/type/type'

import MyMain from './components/myMain'

const i18nNamespaces = ['translation']

export default async function UserApartmentsItem({
	params: { locale, id },
}: {
	params: { locale: string; id: string }
}) {
	const { resources } = await initTranslations(locale, ['translation'])
	const apartmentData: newApartment = await getApartamentId(id)

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div className={style.wrapper}>
				<MyMain apartmentData={apartmentData} />
			</div>
		</TranslationsProvider>
	)
}
