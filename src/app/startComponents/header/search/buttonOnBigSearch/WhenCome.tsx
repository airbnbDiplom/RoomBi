import React, { useEffect, useState } from 'react'
import style from '../Search.module.css'
import { ThemProps } from '@/app/type/type'
import WhenDropDawn from './WhenDropDawn'
import { useAppSelector } from '@/app/redux/hook'
interface WhenComeProps {
	isWhenDropOn?: boolean
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const WhenCome: React.FC<WhenComeProps & ThemProps> = ({
	isWhenDropOn,
	openDropDawn,
	isTeamBlack,
}) => {
	const [dateVieOnButtonSearch, setDateVieOnButtonSearch] =
		useState('Додайте дату')
	const calendarDate = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)

	useEffect(() => {
		if (calendarDate !== '') {
			const date = new Date(calendarDate)
			const formatter = new Intl.DateTimeFormat(
				'uk', //TODO: заменить на нужный локаль	язык отображения даты
				{
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				}
			)
			const formattedDate = formatter.format(date)
			setDateVieOnButtonSearch(formattedDate)
		} else {
			setDateVieOnButtonSearch('Додайте дату')
		}
	}, [calendarDate])
	return (
		<>
			<button
				id='when'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && isWhenDropOn ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !isWhenDropOn && style.btnBlackBac}`}
				onClick={event => openDropDawn(event)}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-xs-2 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`m-0 ${style.colorOne}`}>Прибуття</p>
					<p className={`${style.colorTwo} m-0`}>{dateVieOnButtonSearch}</p>
				</div>
				{dateVieOnButtonSearch !== "" && }
			</button>
			{isWhenDropOn && <WhenDropDawn />}
		</>
	)
}

export default WhenCome
