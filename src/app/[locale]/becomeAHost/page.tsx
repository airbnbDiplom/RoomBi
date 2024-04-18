import { HomeParams } from '@/app/type/type'
import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import style from './addApart.module.css'
import GratingsComponent from './components/gratingsComponent'

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
			<div className={`${style.wrapper} ${style.girdLayout}`}>
				<div className={style.textBlock}>
					<GratingsComponent />
				</div>
				<div className={style.videoBox}>
					<video autoPlay>
						<source src='https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high' />
					</video>
				</div>
			</div>
		</TranslationsProvider>
	)
}
