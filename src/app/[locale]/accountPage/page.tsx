import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import { Footer } from '@/app/startComponents/footer/Footer'
import { Header } from '@/app/startComponents/header/Header'
import { HomeParams } from '@/app/type/type'
import React from 'react'
import styles from './account.module.css'

const i18nNamespaces = ['translation']

export default async function AccountPage({
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
			<div className={styles.pageContainer}>
				<div className='header-main'>
					<Header />
				</div>
				<div className={styles.content}>
					<h1>Account</h1>
					<div>
						<h2>Personal Information</h2>
						<p>Name: </p>
						<p>Email: </p>
					</div>
				</div>
				<Footer />
			</div>
		</TranslationsProvider>
	)
}
