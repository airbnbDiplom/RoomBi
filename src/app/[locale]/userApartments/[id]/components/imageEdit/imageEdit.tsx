'use client'
import { Form } from 'react-bootstrap'
import style from '../../edit.module.css'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/redux/hook'
import ImageItem from './imageItem'
import AddBtn from './addBtn'
import { useEffect } from 'react'
import PlaceImage from './placeImage'

const ImageEdit = () => {
	const { t } = useTranslation()
	const pictureArray = useAppSelector(
		state => state.updateApartmentSlice.pictures
	)
	const pictureFileFromLocale = useAppSelector(
		state => state.updateApartmentSlice.pictureFile
	)
	const pictureNameFromLocale = useAppSelector(
		state => state.updateApartmentSlice.picturesName
	)
	const fileURL = 'https://roombi.space/Car/'

	useEffect(() => {
		console.log('pictureFileFromLocale', pictureFileFromLocale)
	}, [pictureFileFromLocale])

	return (
		<div className={style.imageContainer}>
			<Form.Label>{t('userApartmentsEdit_labelImg')}</Form.Label>
			<div className={style.itemListBlock}>
				<div className={style.insideImageBlock}>
					<div className={style.backGroundDiv}>
						<div className={style.backgroundContainer}>
							<PlaceImage />
							<span>{t('userApartmentEdit_addPicture')}</span>
						</div>
					</div>
					{pictureArray.map((item, index) => (
						<ImageItem
							localResource={false}
							key={index}
							pictureUrl={item.pictureUrl}
							index={index}
							fileURL={fileURL}
						/>
					))}
					{pictureFileFromLocale &&
						pictureFileFromLocale.length > 0 &&
						pictureFileFromLocale.map((item, index) => (
							<ImageItem
								localResource={true}
								key={index}
								pictureUrl={item}
								index={index}
								fileURL={''}
							/>
						))}
				</div>
			</div>
			<AddBtn />
		</div>
	)
}

export default ImageEdit
