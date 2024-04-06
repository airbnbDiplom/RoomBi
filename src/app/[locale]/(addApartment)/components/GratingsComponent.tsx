'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

const GratingsComponent = () => {
	const { t } = useTranslation()
	return (
		<>
			<h1>{t('gratings')}</h1>
			<p>{t("let'sStart")}</p>
		</>
	)
}

export default GratingsComponent
