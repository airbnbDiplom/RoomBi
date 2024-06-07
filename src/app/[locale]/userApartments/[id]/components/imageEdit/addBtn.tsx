'use client'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import Image from 'next/image'
import React from 'react'
import { useAppDispatch } from '@/app/redux/hook'
import { v4 as uuidv4 } from 'uuid'
import {
	setNewFileItemArray,
	setNewFileNameArray,
} from '@/app/redux/updateApartment/updateApartmentSlice'
import PlaceImage from './placeImage'

const AddBtn: React.FC = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const addFileRef = React.useRef<HTMLInputElement>(null)
	const addPictureHandler = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		addFileRef.current?.click()
	}
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
					dispatch(setNewFileItemArray(reader.result as string))
					dispatch(setNewFileNameArray(newFile.name))
				}
				reader.readAsDataURL(newFile)
			} else {
				// File has invalid extension
				console.error('Invalid file extension')
			}
		}
	}

	return (
		<div className={style.addBtnContainer}>
			<div className={style.addBtn} onClick={addPictureHandler}>
				<input
					type='file'
					ref={addFileRef}
					accept='.jpg,.jpeg,.png,.gif,.webp,.svg'
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
				<PlaceImage />
				{t('userApartmentEdit_addPicture')}
			</div>
		</div>
	)
}

export default AddBtn
