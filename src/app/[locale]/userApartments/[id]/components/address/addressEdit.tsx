'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setAddressEdit } from '@/app/redux/updateApartment/updateApartmentSlice'
import { set } from 'lodash'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
const AddressEdit = () => {
	const { t } = useTranslation()
	const addressCurr = useAppSelector(
		state => state.updateApartmentSlice.address
	)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(addressCurr)
	useEffect(() => {
		setValue(addressCurr)
	}, [addressCurr])
	const handlerAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		dispatch(setAddressEdit(e.target.value))
	}

	return (
		<div>
			<Form.Group>
				<Form.Control type='text' value={value} onChange={handlerAddress} />
				<Form.Text>{t('userApartmentsEdit_AddressSubHeader')}</Form.Text>
			</Form.Group>
		</div>
	)
}
export default AddressEdit
