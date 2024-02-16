import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import style from '../Search.module.css'
import Calendar from 'react-calendar'
import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import PrevArrow from '../../../../ui/arrow/PrevArrow'
import NextArrow from '../../../../ui/arrow/NextArrow'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'

interface SetWhenObjDate {
	setWhenObjDate: ActionCreatorWithPayload<string, string>
}

const WhenDropDawn: React.FC<SetWhenObjDate> = ({ setWhenObjDate }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const calendarValueDataCome = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarValueDataD = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)
	return (
		<div className={`d-grid  ${style.whenDropDawn}`}>
			<Calendar
				onClickDay={value => {
					dispatch(setWhenObjDate(value.toString()))
				}}
				//	{defaultValue={ calendarValueDataCome !== "" ? new Date(calendarValueDataCome):undefined}}
				defaultValue={
					calendarValueDataCome !== '' && calendarValueDataD !== ''
						? [new Date(calendarValueDataCome), new Date(calendarValueDataD)]
						: calendarValueDataCome !== ''
						? new Date(calendarValueDataCome)
						: calendarValueDataD !== ''
						? new Date(calendarValueDataD)
						: null
				}
				locale={t('ISOLocale')}
				showDoubleView={true}
				showNeighboringMonth={false}
				minDetail='month'
				prevLabel={<PrevArrow />}
				nextLabel={<NextArrow />}
				selectRange={true}
				minDate={new Date()}
			/>
		</div>
	)
}
export default WhenDropDawn
