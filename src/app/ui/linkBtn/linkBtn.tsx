'use client'
import style from './linkBtnStyle.module.css'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
interface BtnProps {
	BgColor: string
	text: string
	href: string
	textColor: string
}

const LinkBtn: React.FC<BtnProps> = ({ BgColor, text, href, textColor }) => {
	const { t } = useTranslation()
	return (
		<Link
			href={href}
			style={{ background: BgColor, color: textColor }}
			className={style.btnStyle}
		>
			{t(text)}
		</Link>
	)
}

export default LinkBtn
