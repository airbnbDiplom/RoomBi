import { HomeParams } from '@/app/type/type'
import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import ApartmentsList from './components/apartmentsList'
import UserInfo from './components/userInfo'
import style from './userApartments.module.css'
const i18nNamespaces = ['translation']

export default async function SearchDataView({
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
			<div className={style.wrapper}>
				<ApartmentsList />
				<UserInfo />
			</div>
		</TranslationsProvider>
	)
}
