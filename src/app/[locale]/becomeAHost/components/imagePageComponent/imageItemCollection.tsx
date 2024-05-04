'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import React, { useEffect } from 'react'
import PreviewAddedPictureComponent from './previewAddedPictureComponent'
import AddPictureComponent from './addPictureComponent'
import style from './imagePageComponent.module.css'
import { setPhotoName } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
const ImageItemCollection = () => {
	const picturesNameState = useAppSelector(
		state => state.newApartmentReducer.picturesName
	)
	const picturesFileState = useAppSelector(
		state => state.newApartmentReducer.pictureFile
	)

	return (
		<div className={style.imageListContainer}>
			{picturesFileState.map((item, index) => (
				<PreviewAddedPictureComponent
					key={index}
					pictureFile={item}
					index={index}
				/>
			))}
			{picturesFileState.length < 5 ? (
				Array(5 - picturesFileState.length)
					.fill(null)
					.map((_, index) => (
						<AddPictureComponent key={picturesFileState.length + index} />
					))
			) : (
				<AddPictureComponent key={0} />
			)}
		</div>
	)
}

export default ImageItemCollection
