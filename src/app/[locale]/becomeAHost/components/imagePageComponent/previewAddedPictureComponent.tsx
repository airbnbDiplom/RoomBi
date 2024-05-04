'use client'
import Image from 'next/image'
import React from 'react'
import style from './imagePageComponent.module.css'

import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/redux/hook'
import {
	removePhotoFile,
	removePhotoName,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
interface propsPicturePreview {
	pictureFile: string
	index: number
}
const PreviewAddedPictureComponent: React.FC<propsPicturePreview> = ({
	pictureFile,
	index,
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const deletePictureHandler = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		dispatch(removePhotoFile(index))
		dispatch(removePhotoName(index))
	}

	return (
		<div className={`${style.itemContainer}   `}>
			<Image src={pictureFile} width={150} height={150} alt='photo Preview' />
			<div className={style.croce} onClick={deletePictureHandler}>
				<Image src='/img/croce.svg' width={30} height={30} alt='croce' />
				<p>{t('delete')}</p>
			</div>
		</div>
	)
}

export default PreviewAddedPictureComponent
