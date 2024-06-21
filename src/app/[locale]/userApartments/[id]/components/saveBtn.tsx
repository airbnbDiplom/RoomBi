'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../edit.module.css'
import Spinner from '@/app/[locale]/becomeAHost/components/btnSpinner'
import { useAppSelector } from '@/app/redux/hook'
import { set, update } from 'lodash'
import { addPictureJfObject } from '@/app/services/addPictureJfObject'
import ModalAddNEwApart from '@/app/[locale]/becomeAHost/components/modalAddNEwApart'
import { updateApartmentService } from '@/app/services/updateApartmentService'
interface Props {
	apartmentId: string
}
const SaveBtn: React.FC<Props> = ({ apartmentId }) => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	const apartmentData = useAppSelector(state => state.updateApartmentSlice)
	const btnDisable = useAppSelector(state => state.saveBtnSlice.btnState)

	const [modalSuccess, setModalSuccess] = useState<number>(0)
	const [show, setShow] = useState(false)

	const validateObj = () => {
		if (
			apartmentData.masterId === '' ||
			apartmentData.address === '' ||
			apartmentData.city === '' ||
			apartmentData.country === '' ||
			apartmentData.offeredAmenities.description === '' ||
			apartmentData.countryCode === '' ||
			apartmentData.title === '' ||
			apartmentData.house === undefined ||
			apartmentData.location === undefined ||
			apartmentData.typeApartment === undefined ||
			apartmentData.cityPlaceId === 0 ||
			apartmentData.pricePerNight === 0 ||
			apartmentData.gests === 0 ||
			apartmentData.pictures.length + apartmentData.pictureFile.length < 5
		) {
			return false
		}
		return true
	}

	return (
		<>
			<button
				className={style.btnSave}
				onClick={() => {
					setLoading(true)

					if (validateObj()) {
						// console.log('apartmentId', apartmentId)
						updateApartmentService(apartmentData, apartmentId).then(res => {
							setLoading(false)
							if (res) {
								for (let i = 0; i < apartmentData.pictureFile.length; i++) {
									addPictureJfObject(
										apartmentData.pictureFile[i],
										apartmentData.picturesName[i]
									)
								}
								console.log('photoSend')
								setLoading(false)
								setModalSuccess(1)
								setShow(true)
							} else {
								setLoading(false)
								setModalSuccess(2)
								setShow(true)
							}
						})
					} else {
						setLoading(false)
						setModalSuccess(3)
						setShow(true)
					}
				}}
				disabled={loading ? true : false}
			>
				{loading ? <Spinner /> : t('userApartmentEdit_save')}
			</button>
			{modalSuccess === 1 && (
				<ModalAddNEwApart
					show={show}
					setShow={setShow}
					setModalSuccess={setModalSuccess}
					tittle={'preview_success'}
					message={'userApartmentsEdit_EditApartmentAddSuccess'}
				/>
			)}
			{modalSuccess === 2 && (
				<ModalAddNEwApart
					show={show}
					setShow={setShow}
					setModalSuccess={setModalSuccess}
					tittle={'preview_felid'}
					message={'userApartmentsEdit_EditApartmentAddFalse'}
				/>
			)}
			{modalSuccess === 3 && (
				<ModalAddNEwApart
					show={show}
					setShow={setShow}
					setModalSuccess={setModalSuccess}
					tittle={'preview_notValid'}
					message={'userApartmentsEdit_EditApartmentNotValid'}
				/>
			)}
		</>
	)
}

export default SaveBtn
