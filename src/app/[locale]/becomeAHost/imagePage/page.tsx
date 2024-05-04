'use server'
import React from 'react'
import style from '../addApart.module.css'
import initTranslations from '@/app/i18n'
import { HomeParams } from '@/app/type/type'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import PageHeader from '../components/header'
import ImageItemCollection from '../components/imagePageComponent/imageItemCollection'
import SubHeader from '../components/subHeader'

const i18nNamespaces = ['translation']
export default async function ImagePage({
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
				<PageHeader text={'imageHeaderText'} />
				<SubHeader text={'imageSubHeader'} />
				<ImageItemCollection />
			</div>
		</TranslationsProvider>
	)
}
