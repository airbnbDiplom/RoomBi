import { HomeParams } from '@/app/type/type'
import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import style from '../addApart.module.css'

import LinkBtn from '@/app/ui/linkBtn/linkBtn'
import { useTranslation } from 'react-i18next'
import GratingsComponent from '../components/GratingsComponent'
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
				<div className={style.textBlock}>
					<GratingsComponent />
				</div>
				<div className={style.videoBox}>
					<video autoPlay>
						<source src='https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high' />
					</video>{' '}
				</div>
				<div className={style.firstBtn}>
					<LinkBtn
						href={'/'}
						text={'exit'}
						BgColor={'#211e1a'}
						textColor={'white'}
					/>
				</div>
				<div className={style.secondBtn}>
					<LinkBtn
						href={'#'}
						text={'start'}
						BgColor={'#433d35'}
						textColor={'#f8f9fa'}
					/>
				</div>
			</div>
		</TranslationsProvider>
	)
}
