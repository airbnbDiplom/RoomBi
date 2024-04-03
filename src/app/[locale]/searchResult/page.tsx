'use client'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import { Footer } from '@/app/startComponents/footer/Footer'
import { Header } from '@/app/startComponents/header/Header'
import { HomeParams } from '@/app/type/type'
import React, { useEffect, useState } from 'react'
import FilterMain from './components/filterMain'

const i18nNamespaces = ['translation']

export default function SearchDataView({
	params: { locale },
}: {
	params: HomeParams
}) {
	const [resources, setResources] = useState(null)

	useEffect(() => {
		const fetchTranslations = async () => {
			const { resources } = await initTranslations(locale, ['translation'])
			setResources(resources)
		}
		fetchTranslations()
	}, [locale])

	if (!resources) {
		// Optional: You can return a loading indicator here if needed
		return null
	}

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
