'use client'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
interface HeaderProps {
	text: string
}
const SubHeader: FC<HeaderProps> = ({ text }) => {
	const { t } = useTranslation()
	return <h2>{t(text)}</h2>
}
export default SubHeader
