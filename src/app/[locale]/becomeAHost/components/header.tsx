'use client'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
interface HeaderProps {
	text: string
}
const PageHeader: FC<HeaderProps> = ({ text }) => {
	const { t } = useTranslation()
	return <h1>{t(text)}</h1>
}
export default PageHeader
