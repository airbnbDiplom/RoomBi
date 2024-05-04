'use server'
import React from 'react'
import style from '../addApart.module.css'
import initTranslations from '@/app/i18n'
import { HomeParams } from '@/app/type/type'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import PageHeader from '../components/header'
import ImageItemCollection from '../components/imagePageComponent/imageItemCollection'
import SubHeader from '../components/subHeader'
import DescriptionInput from '../components/descriptionComponent/descriptionInput'
import TitleInput from '../components/descriptionComponent/titleInput'

const i18nNamespaces = ['translation']
export default async function DescriptionPage({
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
					<PageHeader text={'descriptionHeaderText'} />
					<SubHeader text={'titleSubHeader'} />
					<TitleInput />
					<SubHeader text={'descriptionSubHeader'} />
					<DescriptionInput />
				</div>
			</div>
		</TranslationsProvider>
	)
}
