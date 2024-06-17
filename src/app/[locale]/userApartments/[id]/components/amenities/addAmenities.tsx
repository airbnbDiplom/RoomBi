'use client'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import style from '../../edit.module.css'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/redux/hook'
import { setAmenityInEdit } from '@/app/redux/updateApartment/updateApartmentSlice'
import { useEffect, useState } from 'react'
interface Props {
	booleanProps: string[]
}
const AddAmenities: React.FC<Props> = ({ booleanProps }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [state, setState] = useState('')
	const [title, setTitle] = useState('')

	useEffect(() => {
		setTitle(state)
	}, [state])
	return (
		<div className={style.dropdownSide}>
			<DropdownButton
				className={style.dropdownSide_dropdown}
				variant={'outline-dark'}
				title={title === '' ? t('userApartmentEdit_choiceAmenities') : t(title)}
			>
				{booleanProps.map(prop => (
					<div key={prop} className={style.b}>
						{prop !== 'specialFeatures' &&
							prop !== 'description' &&
							prop !== 'id' && (
								<Dropdown.Item onClick={() => setState(prop)}>
									{t(prop)}
								</Dropdown.Item>
							)}
					</div>
				))}
			</DropdownButton>
			<button
				className={style.dropdownSide_addBtn}
				disabled={state === '' ? true : false}
				onClick={() => {
					if (state !== '') {
						dispatch(setAmenityInEdit(state))
						setState('')
					}
				}}
			>
				{t('add')}
			</button>
		</div>
	)
}

export default AddAmenities
