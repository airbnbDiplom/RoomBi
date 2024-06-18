import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/redux/hook'
import style from '@/app/ui/emptyBtn/linkBtnStyle.module.css'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ModalAddNEwApart from './modalAddNEwApart'
import Spinner from './btnSpinner' // Assuming you have a Spinner component

import { newApartment } from '@/app/type/type'
import { addPictureJfObject } from '@/app/services/addPictureJfObject'
import { addNewApartServes } from '@/app/services/addnewApartService'

const FinishBtn = () => {
	const { t } = useTranslation()
	const stateObject: newApartment = useAppSelector(
		state => state.newApartmentReducer
	)
	const [loading, setLoading] = useState(false)
	const [modalSuccess, setModalSuccess] = useState<number>(0)
	const [show, setShow] = useState(false)
	const validateObj = () => {
		if (
			stateObject.masterId === '' ||
			stateObject.address === '' ||
			stateObject.city === '' ||
			stateObject.country === '' ||
			stateObject.description === '' ||
			stateObject.countryCode === '' ||
			stateObject.title === '' ||
			stateObject.house === undefined ||
			stateObject.location === undefined ||
			stateObject.typeApartment === undefined ||
			stateObject.cityPlaceId === 0 ||
			stateObject.pricePerNight === 0 ||
			stateObject.gests === 0 ||
			stateObject.pictureFile.length === 0 ||
			stateObject.picturesName.length === 0
		) {
			return false
		}
		return true
	}
	const btnHandler = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault()
		setLoading(true)
		if (validateObj()) {
			addNewApartServes(stateObject).then(data => {
				console.log('data', data)
				if (data === 200) {
					for (let i = 0; i < stateObject.pictureFile.length; i++) {
						addPictureJfObject(
							stateObject.pictureFile[i],
							stateObject.picturesName[i]
						)
					}
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
	}
	useEffect(() => {
		if (modalSuccess !== null) setShow(true)
	}, [modalSuccess])

	return (
		<>
			<button
				className={style.btnStyle}
				onClick={btnHandler}
				disabled={loading}
			>
				{loading ? <Spinner /> : t('finish')}
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

export default FinishBtn
