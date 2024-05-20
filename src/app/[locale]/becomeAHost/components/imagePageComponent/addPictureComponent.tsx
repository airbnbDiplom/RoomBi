'use client'
import React from 'react'
import style from './imagePageComponent.module.css'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/redux/hook'
import { v4 as uuidv4 } from 'uuid'
import {
	setPhotoFile,
	setPhotoName,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

const AddPictureComponent = ({
	index,
	picturesNameLength,
}: {
	index: number
	picturesNameLength: number
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const addPictureHandler = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		inputFileRef.current?.click()
	}
	console.log(index)
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
			const extension = file.name.split('.').pop()?.toLowerCase()
			if (extension && allowedExtensions.includes(extension)) {
				// File has valid extension, handle it
				const guid = uuidv4()

				const newFileName = `${guid}.${extension}`
				const newFile = new File([file], newFileName, { type: file.type })
				const reader = new FileReader()
				reader.onload = () => {
					dispatch(setPhotoFile(reader.result as string))
					dispatch(setPhotoName(newFile.name))
				}
				reader.readAsDataURL(newFile)
			} else {
				// File has invalid extension
				console.error('Invalid file extension')
			}
		}
	}
	const inputFileRef = React.useRef<HTMLInputElement>(null)
	return (
		<div className={style.itemContainer} onClick={addPictureHandler}>
			<input
				type='file'
				ref={inputFileRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
				accept='.jpg,.jpeg,.png,.gif,.webp,.svg' // Specify accepted file types
			/>
			<Image
				src='/img/Photo_Add-RoundedBlack-512.svg'
				alt='add'
				width={50}
				height={50}
			/>
			<p>
				{t('addPicture')}{' '}
				{picturesNameLength === 1 && index === 0 && t('bedroom')}
				{picturesNameLength === 0 && index === 0 && t('addPicture_MainFoto')}
			</p>
		</div>
	)
}

export default AddPictureComponent
