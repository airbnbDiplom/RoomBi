'use client'

import { useAppSelector } from '@/app/redux/hook'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import { filterData } from '@/app/startComponents/naw/dataFilter/data'
import SwitcherItem from './switcherItem'
import {
	ApartmentsVariant,
	apartmentVariant,
} from '@/app/[locale]/becomeAHost/components/apartmentsVariantList'
import {
	setApartmentPartEdit,
	setHouseEdit,
	setLocationEdit,
	setSportsEdit,
} from '@/app/redux/updateApartment/updateApartmentSlice'

import { useEffect, useState } from 'react'

const SwitchBlock = () => {
	const [loading, setLoading] = useState(false)
	const { t } = useTranslation()
	const apartmentType: ApartmentsVariant | undefined = useAppSelector(
		state => state.updateApartmentSlice.typeApartment
	)
	const sportNearApartment = useAppSelector(
		state => state.updateApartmentSlice.sport
	)
	const locationNearApartment = useAppSelector(
		state => state.updateApartmentSlice.location
	)
	const HouseNearApartment = useAppSelector(
		state => state.updateApartmentSlice.house
	)
	useEffect(() => {
		if (apartmentType !== undefined && HouseNearApartment !== undefined) {
			setLoading(true)
		}
	}, [apartmentType, HouseNearApartment])
	return (
		<div>
			<Form.Label>{t('userApartmentsEdit_switcherHeader')}</Form.Label>
			{loading && (
				<div className={style.switchBlock}>
					<div className={style.apartmentTypeBlock}>
						<SwitcherItem
							label={t('userApartmentsEdit_switcherApartmentPart')}
							currentValue={
								apartmentVariant.filter(
									item => item.ukName === (apartmentType as any)
								)?.[0]
							}
							array={apartmentVariant}
							dispatchFuncAV={setApartmentPartEdit}
						/>
					</div>
					<div className={style.switcherBlock}>
						<SwitcherItem
							label={t('userApartmentsEdit_switcherHouse')}
							currentValue={
								filterData.filter(
									item => item.nameUa === (HouseNearApartment as any)
								)?.[0]
							}
							array={filterData.filter(item => item.type === 'house')}
							dispatchFuncFO={setHouseEdit}
						/>
						<SwitcherItem
							label={t('userApartmentsEdit_switcherLocation')}
							currentValue={
								filterData.filter(
									item =>
										item.type === 'location' &&
										item.nameUa === locationNearApartment
								)?.[0]
							}
							array={filterData.filter(item => item.type === 'location')}
							dispatchFuncFO={setLocationEdit}
						/>
						<SwitcherItem
							label={t('userApartmentsEdit_switcherSport')}
							currentValue={
								filterData.filter(
									item =>
										item.type === 'sport' && item.nameUa === sportNearApartment
								)?.[0]
							}
							array={filterData.filter(item => item.type === 'sport')}
							dispatchFuncFO={setSportsEdit}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default SwitchBlock
