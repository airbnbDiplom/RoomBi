'use client'
import React, { useEffect, useState } from 'react'
import style from '../userApartments.module.css'
import { useSession } from 'next-auth/react'
import { decodeTokenGetId } from '@/app/services/jwtDecoder'
import { getUserApartmentsListService } from '@/app/services/getUserApartmentsListService'
import { RentalApartmentDTOForStartPage } from '@/app/type/type'
import ApartListItem from './apartListItem'
import Loading from './loading'
import AddNewBtn from './addNewBtn'
import { deleteItemService } from '@/app/services/deleteItemService'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const ApartmentsList = () => {
	const { t } = useTranslation()
	const [userApartmentsList, setUserApartmentsList] = useState<
		RentalApartmentDTOForStartPage[] | null
	>(null)
	const [loading, setLoading] = useState(true)
	const [userId, serUSerId] = useState<number | null>(null)
	const { data: session } = useSession()
	const token = session?.user?.name || null
	let id: number | null = null
	if (token) id = decodeTokenGetId(token)

	useEffect(() => {
		if (id) {
			serUSerId(id)
		}
	}, [id])
	useEffect(() => {
		if (userApartmentsList === null) {
			if (userId)
				getUserApartmentsListService(userId).then(data => {
					setLoading(false)
					if (data) setUserApartmentsList(data)
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId])
	const deleteHandler = (itemId: number) => {
		setUserApartmentsList(prevList =>
			prevList ? prevList.filter(item => item.id !== itemId) : null
		)
		deleteItemService(itemId).then(data => {
			if (data !== 200) {
			}
		})
	}
	return (
		<div className={style.apartListContainer}>
			<Link href={'/'} className={style.backBtn}>
				{t('back')}
			</Link>
			<div className={style.addNewBtnContainer}>
				<AddNewBtn />
			</div>
			<div className={style.itemList}>
				{loading ? (
					<Loading />
				) : (
					userApartmentsList &&
					userApartmentsList.map(apartment => {
						return (
							<ApartListItem
								item={apartment}
								key={apartment.id}
								delete={deleteHandler}
							/>
						)
					})
				)}
			</div>
		</div>
	)
}

export default ApartmentsList
