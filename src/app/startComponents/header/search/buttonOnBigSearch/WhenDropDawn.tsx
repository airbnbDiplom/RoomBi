import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import style from '../Search.module.css'
import Calendar from 'react-calendar'
import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import PrevArrow from '../../../../ui/arrow/PrevArrow'
import NextArrow from '../../../../ui/arrow/NextArrow'
import { setWhenObjDateCome } from '@/app/redux/searchInHeader/SearchSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface SetWhenObjDate {
	setWhenObjDate: ActionCreatorWithPayload<string, string>
}

const WhenDropDawn: React.FC<SetWhenObjDate> = ({ setWhenObjDate }) => {
	const dispatch = useAppDispatch()
	const calendarValueDataCome = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarValueDataD = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)
	const [DateArr, setDataArr] = useState<Date | [Date, Date]>()

	useEffect(() => {
		if (calendarValueDataCome !== '') {
			const startDate = new Date(calendarValueDataCome)
			if (calendarValueDataD !== '') {
				const endDate = new Date(calendarValueDataD)
				console.log('startDate', startDate)
				console.log('endDate', endDate)
				setDataArr([startDate, endDate])
			} else {
				setDataArr(startDate)
			}
		}
	}, [calendarValueDataCome, calendarValueDataD])
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
