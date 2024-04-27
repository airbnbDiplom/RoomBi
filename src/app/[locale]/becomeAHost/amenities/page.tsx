import { HomeParams } from '@/app/type/type'
import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import PageHeader from '../components/header'
import style from '../addApart.module.css'
import AmenitiesBlock from '../components/amenitiesBlock/amenitiesBlock'

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
			<div className={`${style.wrapper} ${style.flexRow} `}>
				<div className={style.centerDiv}>
					<PageHeader text={'amenitiesHeader'} />
					<AmenitiesBlock />
				</div>
			</div>
		</TranslationsProvider>
	)
}
