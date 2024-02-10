import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import style from '../Search.module.css'
import Calendar from 'react-calendar'
import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import PrevArrow from '../../../../ui/arrow/PrevArrow'
import NextArrow from '../../../../ui/arrow/NextArrow'
import { setWhenObjDateCome } from '@/app/redux/searchInHeader/SearchSlice'

const WhenDropDawn = () => {
	const dispatch = useAppDispatch()
	const calendarValue = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	useEffect(() => {
		console.log('calendarValue', calendarValue)
	}, [calendarValue])
	return (
		<div className={`d-grid  ${style.whenDropDawn}`}>
			<Calendar
				onClickDay={value => {
					dispatch(setWhenObjDateCome(value.toString()))
					console.log(calendarValue)
				}}
				defaultValue={
					calendarValue === '' ? undefined : new Date(calendarValue)
				}
				locale='uk-UA'
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
