'use client'
import { useAppSelector } from '@/app/redux/hook'
import React from 'react'
import SubHeader from '../subHeader'
import ItemAmenities from './itemAmenities'
import style from './amenities.module.css'

const AmenitiesBlock = () => {
	const amenitiesState = useAppSelector(
		state => state.newApartmentReducer.offeredAmenities
	)

	const amenities = [
		{ key: 'wiFi', value: amenitiesState.wiFi, title: 'txtFB11' },
		{ key: 'tV', value: amenitiesState.tV, title: 'txtFB12' },
		{ key: 'kitchen', value: amenitiesState.kitchen, title: 'txtFB13' },
		{
			key: 'washingMachine',
			value: amenitiesState.washingMachine,
			title: 'txtFB14',
		},
		{ key: 'freeParking', value: amenitiesState.freeParking, title: 'txtFB19' },
		{ key: 'paidParking', value: amenitiesState.paidParking, title: 'txtFB20' },
		{
			key: 'airConditioner',
			value: amenitiesState.airConditioner,
			title: 'txtFB15',
		},
		{ key: 'workspace', value: amenitiesState.workspace, title: 'txtFB16' },
	]
	const spacialAmenities = [
		{ key: 'pool', value: amenitiesState.pool, title: 'txtFB21' },
		{ key: 'jacuzzi', value: amenitiesState.jacuzzi, title: 'txtFB22' },
		{ key: 'innerYard', value: amenitiesState.innerYard, title: 'txtFB23' },
		{ key: 'bBQArea', value: amenitiesState.bBQArea, title: 'txtFB24' },
		{
			key: 'outdoorDiningArea',
			value: amenitiesState.outdoorDiningArea,
			title: 'txtFB25',
		},
		{ key: 'firePit', value: amenitiesState.firePit, title: 'txtFB26' },
		{ key: 'poolTable', value: amenitiesState.poolTable, title: 'txtFB27' },
		{ key: 'fireplace', value: amenitiesState.fireplace, title: 'txtFB29' },
		{ key: 'piano', value: amenitiesState.piano, title: 'txtFB30' },
		{
			key: 'gymEquipment',
			value: amenitiesState.gymEquipment,
			title: 'txtFB31',
		},
		{ key: 'lakeAccess', value: amenitiesState.lakeAccess, title: 'txtFB33' },
		{ key: 'beachAccess', value: amenitiesState.beachAccess, title: 'txtFB34' },
		{ key: 'skiInOut', value: amenitiesState.skiInOut, title: 'txtFB35' },
		{
			key: 'outdoorShower',
			value: amenitiesState.outdoorShower,
			title: 'txtFB32',
		},
	]
	const safetyEquipment = [
		{
			key: 'smokeDetector',
			value: amenitiesState.smokeDetector,
			title: 'txtFB37',
		},
		{
			key: 'firstAidKit',
			value: amenitiesState.firstAidKit,
			title: 'firstAidKit',
		},
		{
			key: 'fireExtinguisher',
			value: amenitiesState.fireExtinguisher,
			title: 'fireExtinguisher',
		},
		{
			key: 'carbonMonoxideDetector',
			value: amenitiesState.carbonMonoxideDetector,
			title: 'txtFB36',
		},
	]

	return (
		<>
			<div className={style.amenitiesTypeContainer}>
				{amenities.map(item => (
					<ItemAmenities
						key={item.key}
						item={item}
						amenitiesState={amenitiesState}
					/>
				))}
			</div>
			<SubHeader text={'special'} />
			<div className={style.amenitiesTypeContainer}>
				{spacialAmenities.map(item => (
					<ItemAmenities
						key={item.key}
						item={item}
						amenitiesState={amenitiesState}
					/>
				))}
			</div>
			<SubHeader text={'safety'} />
			<div className={style.amenitiesTypeContainer}>
				{safetyEquipment.map(item => (
					<ItemAmenities
						key={item.key}
						item={item}
						amenitiesState={amenitiesState}
					/>
				))}
			</div>
		</>
	)
}

export default AmenitiesBlock
