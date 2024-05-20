'use client'
import { useAppSelector } from '@/app/redux/hook'
import React from 'react'
import PreviewAddedPictureComponent from './previewAddedPictureComponent'
import AddPictureComponent from './addPictureComponent'
import style from './imagePageComponent.module.css'
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
						<AddPictureComponent
							key={picturesFileState.length + index}
							index={index}
							picturesNameLength={picturesNameState.length}
						/>
					))
			) : (
				<AddPictureComponent
					key={0}
					index={0}
					picturesNameLength={picturesNameState.length}
				/>
			)}
		</div>
	)
}

export default ImageItemCollection
