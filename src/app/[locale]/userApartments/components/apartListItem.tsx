'use client'
import { RentalApartmentDTOForStartPage } from '@/app/type/type'
import React, { useState } from 'react'
import DeleteBtn from './deleteBtn'
import ModalDialog from './ModalDialog'
import style from '../userApartments.module.css'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import CoverComponent from './coverComponent'
import UpdateBtn from './updateBtn'

interface Props {
	item: RentalApartmentDTOForStartPage
	delete: (id: number) => void
}

const ApartListItem: React.FC<Props> = ({ item, delete: deleteItem }) => {
	const [showModal, setShowModal] = useState(false)
	const { t } = useTranslation()
	const router = useRouter()
	const handleShowModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}
	console.log(item)
	const pageHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		router.push(`/${item.id}`)
	}

	return (
		<>
			<div className={style.itemContainer}>
				<div className={style.carousel}>
					<CoverComponent pictures={item.pictures![0].pictureUrl} />
				</div>
				<div className={style.itemSmallInfo} onClick={pageHandler}>
					<h1>{item.title}</h1>
					<p>
						{t('userApartments_price')}: $ <span>{item.pricePerNight}</span>
					</p>
				</div>
				<div className={style.itemDeleteBtnContainer}>
					<UpdateBtn itemId={item.id} />
					<DeleteBtn showModal={handleShowModal} />
				</div>
			</div>

			<ModalDialog
				title={item?.title!}
				deleteItem={() => deleteItem(item.id)}
				show={showModal}
				setShowModal={handleCloseModal}
			/>
		</>
	)
}
export default ApartListItem
