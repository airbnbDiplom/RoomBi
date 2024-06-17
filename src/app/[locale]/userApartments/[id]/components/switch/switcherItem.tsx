'use client'

import { ApartmentsVariant } from '@/app/[locale]/becomeAHost/components/apartmentsVariantList'
import { useAppDispatch } from '@/app/redux/hook'
import { FilterLngObj } from '@/app/type/type'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Form } from 'react-bootstrap'
import style from '../../edit.module.css'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
interface ISwitcherItem {
	label: string
	currentValue: ApartmentsVariant | FilterLngObj | undefined
	array: FilterLngObj[] | ApartmentsVariant[] | undefined

	dispatchFuncAV?: ActionCreatorWithPayload<ApartmentsVariant>
	dispatchFuncFO?: ActionCreatorWithPayload<FilterLngObj>
}
const isApartmentArr = (
	array: any[] | undefined
): array is ApartmentsVariant[] => {
	if (array)
		return array.every(
			item =>
				typeof item.ukName === 'string' && typeof item.subTitle === 'string'
		)
	return false
}
const isFilterLngObjArr = (
	array: any[] | undefined
): array is FilterLngObj[] => {
	if (array)
		return array.every(
			item => typeof item.label === 'string' && typeof item.nameUa === 'string'
		)
	return false
}
const isApartmentVariantItem = (value: any): value is ApartmentsVariant => {
	return typeof value.ukName === 'string' && typeof value.subTitle === 'string'
}
const isFilterLngObjItem = (value: any): value is FilterLngObj => {
	return typeof value.label === 'string' && typeof value.nameUa === 'string'
}
const SwitcherItem: React.FC<ISwitcherItem> = ({
	label,
	currentValue,
	array,
	dispatchFuncAV,
	dispatchFuncFO,
}) => {
	const { t } = useTranslation()
	const [value, setValue] = useState<FilterLngObj | ApartmentsVariant | null>(
		null
	)
	const [title, setTitle] = useState('select')
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (currentValue && isApartmentVariantItem(currentValue))
			setTitle(currentValue.title)
		else if (currentValue && isFilterLngObjItem(currentValue)) {
			if (t('locale') === 'uk') setTitle(currentValue.nameUa)
			else setTitle(currentValue.nameEn)
		}
	}, [currentValue, t])
	useEffect(() => {
		if (value && isApartmentVariantItem(value)) {
			setTitle(value.title)
			if (dispatchFuncAV !== undefined) dispatch(dispatchFuncAV(value))
		}
		if (value && isFilterLngObjItem(value)) {
			if (t('locale') === 'uk') setTitle(value.nameUa)
			else setTitle(value.nameEn)
			if (dispatchFuncFO !== undefined) dispatch(dispatchFuncFO(value))
		}
	}, [value, t, dispatchFuncAV, dispatch, dispatchFuncFO])
	return (
		<div className={style.switcherItem_block}>
			<Form.Text>{label}</Form.Text>
			<DropdownButton
				variant={'outline-dark'}
				title={t(title)}
				className={style.switcherItem_dropdown}
				id='dropdown-basic'
			>
				{isApartmentArr(array)
					? array.map((item, index) => {
							return (
								<Dropdown.Item onClick={() => setValue(item)} key={index}>
									<div className={style.switcherItem_dropdownItem}>
										<span>{t(item.title)}</span>
										<Image
											src={item.imgPath}
											width={24}
											height={24}
											alt={'image'}
										/>
									</div>
								</Dropdown.Item>
							)
					  })
					: isFilterLngObjArr(array) &&
					  array.map((item, index) => {
							return (
								<Dropdown.Item onClick={() => setValue(item)} key={index}>
									<div className={style.switcherItem_dropdownItem}>
										<span>
											{t('locale') === 'uk' ? item.nameUa : item.nameEn}
										</span>{' '}
										<Image
											src={item.src}
											width={24}
											height={24}
											alt={'image'}
										/>
									</div>
								</Dropdown.Item>
							)
					  })}
			</DropdownButton>
		</div>
	)
}

export default SwitcherItem
