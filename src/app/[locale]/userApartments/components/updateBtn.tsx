'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from '../userApartments.module.css'
import { useRouter } from 'next/navigation'

interface props {
	itemId: number
}
const UpdateBtn: React.FC<props> = ({ itemId }) => {
	const { t } = useTranslation()
	const router = useRouter()
	return (
		<button
			className={style.updateBtn}
			onClick={() => router.push(`/userApartments/${itemId}`)}
		>
			{t('userApartments_updateBtn')}
		</button>
	)
}

export default UpdateBtn
