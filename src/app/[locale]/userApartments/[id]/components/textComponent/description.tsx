'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { useTranslation } from 'react-i18next'
import { Form, InputGroup } from 'react-bootstrap'
import EditImage from './editImage'
import { setDescriptionUpdate } from '@/app/redux/updateApartment/updateApartmentSlice'
import { useCallback, useEffect, useState } from 'react'
import style from '../../edit.module.css'
import { saveBtnToggle } from '@/app/redux/updateApartment/saveBtnSlice'

const Description = () => {
	const { t } = useTranslation()
	const description = useAppSelector(
		state => state.updateApartmentSlice.offeredAmenities.description
	)
	const [titleValidMessage, setTitleValidMessage] = useState('')
	const dispatch = useAppDispatch()
	const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setDescriptionUpdate(event.currentTarget.value))
	}
	const validationOfTitle = useCallback(() => {
		if (description.length < 5 || description.trim() === '') {
			setTitleValidMessage('userApartmentsEdit_DisValidFail_small')
			dispatch(saveBtnToggle(true))
			return false
		} else if (description && description.length > 1000) {
			setTitleValidMessage('userApartmentsEdit_DisValidFail_big')
			dispatch(saveBtnToggle(true))
			return false
		}
		setTitleValidMessage('')
		dispatch(saveBtnToggle(false))
		return true
	}, [description, dispatch])

	useEffect(() => {
		validationOfTitle()
	}, [description, validationOfTitle])
	return (
		<>
			<Form.Label htmlFor='title'>
				{t('userApartmentsEdit_description')}
			</Form.Label>
			<InputGroup id={'textArea'}>
				<Form.Control
					as='textarea'
					value={description}
					rows={5}
					aria-label='With textarea'
					onChange={textAreaHandler}
				/>
				<InputGroup.Text>
					<EditImage />
				</InputGroup.Text>
			</InputGroup>

			{titleValidMessage ? (
				<Form.Text id='text-for-textArea' className={style.failValid}>
					{t(titleValidMessage)}
				</Form.Text>
			) : (
				<Form.Text id='text-for-textArea' muted>
					{t('userApartmentsEdit_DescriptionInfo')}
				</Form.Text>
			)}
		</>
	)
}

export default Description
