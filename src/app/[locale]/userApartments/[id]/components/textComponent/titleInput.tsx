import React, { useCallback, useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setApartment } from '@/app/redux/updateApartment/updateApartmentSlice'
import { saveBtnToggle } from '@/app/redux/updateApartment/saveBtnSlice'
import EditImage from './editImage'

const TitleInput = () => {
	const { t } = useTranslation()
	const apartmentData = useAppSelector(state => state.updateApartmentSlice)
	const dispatch = useAppDispatch()

	const [titleValidMessage, setTitleValidMessage] = useState('')
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setApartment({ ...apartmentData, title: event.target.value }))
	}
	const validationOfTitle = useCallback(() => {
		if (apartmentData.title.length < 5 || apartmentData.title.trim() === '') {
			setTitleValidMessage('userApartmentsEdit_titleValidFail_small')
			dispatch(saveBtnToggle(true))
			return false
		} else if (apartmentData.title && apartmentData.title.length > 50) {
			setTitleValidMessage('userApartmentsEdit_titleValidFail_big')
			dispatch(saveBtnToggle(true))
			return false
		}
		setTitleValidMessage('')
		dispatch(saveBtnToggle(false))
		return true
	}, [apartmentData.title, dispatch])

	useEffect(() => {
		validationOfTitle()
	}, [apartmentData.title, validationOfTitle])
	return (
		<>
			<Form.Label htmlFor='title'>{t('userApartmentsEdit_title')}</Form.Label>
			<InputGroup>
				<Form.Control
					className={style.formText}
					id='title'
					value={apartmentData.title}
					type='text'
					aria-describedby='text-for-infoTitle'
					onChange={handleTitleChange}
				/>
				<InputGroup.Text id='basic-addon2'>
					<EditImage />
				</InputGroup.Text>
			</InputGroup>
			{titleValidMessage ? (
				<Form.Text id='text-for-infoTitle' className={style.failValid}>
					{t(titleValidMessage)}
				</Form.Text>
			) : (
				<Form.Text id='text-for-infoTitle' muted>
					{t('userApartmentsEdit_titleInfo')}
				</Form.Text>
			)}
		</>
	)
}

export default TitleInput
