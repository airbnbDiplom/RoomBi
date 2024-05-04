'use client'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../addApart.module.css'
interface HeaderProps {
	text: string
}
const PageHeader: FC<HeaderProps> = ({ text }) => {
	const { t } = useTranslation()
	return <h1 className={style.pageHeaders}>{t(text)}</h1>
}
export default PageHeader
