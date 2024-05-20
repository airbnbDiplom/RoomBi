import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from '../userApartments.module.css'
import { useTranslation } from 'react-i18next'

const AddNewBtn = () => {
	const { t } = useTranslation()
	return (
		<Link href={'/becomeAHost/houseType'} className={style.addNewApartment}>
			<span>{t('userApartments_add')}</span>
			<Image
				src={'/icon/circle-pluse.svg'}
				width={30}
				height={30}
				alt='add circle icon'
			/>
		</Link>
	)
}

export default AddNewBtn
