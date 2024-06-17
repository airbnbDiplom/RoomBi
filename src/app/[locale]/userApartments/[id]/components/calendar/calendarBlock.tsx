'use client'

import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import NextArrow from '@/app/ui/arrow/NextArrow'
import PrevArrow from '@/app/ui/arrow/PrevArrow'
import Calendar from 'react-calendar'
import { useTranslation } from 'react-i18next'
import 'react-calendar/dist/Calendar.css'
import style from '../../edit.module.css'
import { useEffect, useState } from 'react'
import { setDateBooking } from '@/app/redux/updateApartment/updateApartmentSlice'
import { DateBooking } from '../../../../../type/type'
import { Form } from 'react-bootstrap'

const dateGenerator = (startDate: Date, endDate: Date) => {
	const dateArr: Date[] = []
	let currentDate = startDate
	while (currentDate <= endDate) {
		dateArr.push(currentDate)
		currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
	}
	return dateArr
}

const CalendarBlock = () => {
	const { t } = useTranslation()
	const [width] = useWindowSize()
	const bookingDate = useAppSelector(
		state => state.updateApartmentSlice.dateBooking
	)
	const dispatch = useAppDispatch()
	const [doubleView, setDoubleView] = useState(true)
	const [selectedDates, setSelectedDates] = useState<[Date, Date] | null>(null)
	const [dateArr, setDateArr] = useState<Date[]>([])
	const [btnText, setBtnText] = useState('userApartmentEdit_selectStartDate')
	const isDateDisabled = (date: Date) => {
		return dateArr.some(
			disabledDate =>
				date.getFullYear() === disabledDate.getFullYear() &&
				date.getMonth() === disabledDate.getMonth() &&
				date.getDate() === disabledDate.getDate()
		)
	}
	const reserveDate = () => {
		if (selectedDates) {
			dispatch(setDateBooking(createDataBooking(selectedDates)))
			setBtnText('userApartmentEdit_selectStartDate')
			setSelectedDates(null)
		}
	}
	const disableHandler = (): boolean | undefined => {
		if (Array.isArray(selectedDates)) {
			if (selectedDates && selectedDates[1]) {
				return false
			}
		}
		return true
	}
	useEffect(() => {
		if (Array.isArray(selectedDates)) {
			if (!selectedDates[0]) setBtnText('userApartmentEdit_selectStartDate')
			if (selectedDates[0] && selectedDates[1])
				setBtnText('userApartmentEdit_reserve')
		}
	}, [selectedDates])

	useEffect(() => {
		if (width < 560) setDoubleView(false)
		else setDoubleView(true)
	}, [width])
	useEffect(() => {
		if (bookingDate) {
			const dateArrTemp: Date[] = []
			bookingDate.map(item => {
				dateGenerator(
					new Date(item.start.year, item.start.month, item.start.day),
					new Date(item.end.year, item.end.month, item.end.day)
				).forEach(date => {
					dateArrTemp.push(date)
				})
			})
			setDateArr(dateArrTemp)
		}
	}, [bookingDate])

	return (
		<div>
			<Form.Label>{t('userApartmentsEdit_labelCalendar')}</Form.Label>
			<div className={style.calendarBlock}>
				<Calendar
					className={style.calendar}
					onChange={value => {
						setSelectedDates(value as [Date, Date])
					}}
					onClickDay={() => {
						setBtnText('userApartmentEdit_selectEndDate')
					}}
					value={selectedDates}
					locale={t('ISOLocale')}
					showDoubleView={doubleView}
					showNeighboringMonth={false}
					minDetail='month'
					prevLabel={<PrevArrow />}
					nextLabel={<NextArrow />}
					selectRange={true}
					minDate={new Date()}
					tileDisabled={({ date, view }) =>
						view === 'month' && isDateDisabled(date)
					}
				/>
				<div className={style.reserveDateContainer}>
					<button
						className={style.reserveDate}
						onClick={reserveDate}
						disabled={disableHandler()}
					>
						{t(btnText)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default CalendarBlock
const createDataBooking = (setDateArr: Date[]): DateBooking => {
	return {
		start: {
			day: setDateArr[0].getDate(),
			month: setDateArr[0].getMonth(),
			year: setDateArr[0].getFullYear(),
		},
		end: {
			day: setDateArr[1].getDate(),
			month: setDateArr[1].getMonth(),
			year: setDateArr[1].getFullYear(),
		},
	}
}
