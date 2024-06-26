import React from 'react'
import style from '../addApart.module.css'
import PageHeader from '../components/header'
import { HomeParams } from '@/app/type/type'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import ItemContainer from '../components/itemContainer'

const i18nNamespaces = ['translation']
export default async function HouseType({
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
			<div className={`${style.wrapper} ${style.center}`}>
				<div className={style.centerDiv}>
					<div className={style.block}>
						<PageHeader text={'houseType'} />
						<ItemContainer />
					</div>
				</div>
			</div>
		</TranslationsProvider>
	)
}
