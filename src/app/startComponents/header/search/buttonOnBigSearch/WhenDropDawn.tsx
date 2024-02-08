import { Col, Row } from 'react-bootstrap'
import style from '../Search.module.css'
import Calendar from 'react-calendar'
import { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import PrevArrow from '../../../../ui/arrow/PrevArrow'
import NextArrow from '../../../../ui/arrow/NextArrow'

const WhenDropDawn = () => {
	return (
		<div className={`d-grid  ${style.whenDropDawn}`}>
			<Calendar
				onClickDay={value => alert('Clicked day: ' + value)}
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
