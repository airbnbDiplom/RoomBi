'use client'

import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import Image from 'next/image'
import { useAppDispatch } from '@/app/redux/hook'
import { setDeleteAmenity } from '@/app/redux/updateApartment/updateApartmentSlice'
interface IAmenitiesItem {
	value: string
}

const AmenitiesItem: React.FC<IAmenitiesItem> = ({ value }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const deleteAmenitiesHandler = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		dispatch(setDeleteAmenity(value))
	}

	return (
		<>
			<div className={style.itemAmenitiesList_insideContent}>
				<span>{t(value)}</span>
			</div>
			<div className={style.itemAmenitiesList_insideImg}>
				<Image
					src={`/userInfo/${value}.svg`}
					width={24}
					height={24}
					alt={'amenities img'}
				/>
			</div>
			<div
				className={style.itemAmenitiesList_itemDelete}
				onClick={deleteAmenitiesHandler}
			>
				<Image
					src={`/icon/close.svg`}
					width={24}
					height={24}
					alt={'amenities img'}
				/>
			</div>
		</>
	)
}

export default AmenitiesItem
