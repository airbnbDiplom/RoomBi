import { HomeParams } from '@/app/type/type'
import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import style from '../addApart.module.css'
import PageHeader from '../components/header'
import Counter from '../components/counter/counter'

const i18nNamespaces = ['translation']

export default async function GestCount({
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
					<PageHeader text={'countPageHeader'} />
					<Counter title={'gests'} maxCount={10} minCount={1} />
					<Counter title={'bedrooms'} maxCount={5} minCount={0} />
					<Counter title={'beds'} maxCount={5} minCount={0} />
					<Counter title={'bathrooms'} maxCount={5} minCount={0} />
				</div>
			</div>
		</TranslationsProvider>
	)
}
