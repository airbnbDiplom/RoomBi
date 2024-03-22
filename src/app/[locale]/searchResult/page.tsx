import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import { Footer } from '@/app/startComponents/footer/Footer'
import { Header } from '@/app/startComponents/header/Header'
import { CardBiProps, DataSearchForSorting, HomeParams } from '@/app/type/type'
import React from 'react'
import FilterMain from './components/filterMain'
import { GetServerSideProps } from 'next'
import store from '@/app/redux/store'
import convertData from '@/app/services/conwertDate'
import searchDataService from '@/app/services/searchDataServices'

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
			<div className='header-main'>
				<Header />
			</div>
			<FilterMain />
			<Footer />
		</TranslationsProvider>
	)
}
