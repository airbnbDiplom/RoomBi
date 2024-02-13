import React, { useEffect, useState } from 'react'
import style from '../Search.module.css'
import { SearchBtnEnum, ThemProps } from '@/app/type/type'
import WhenDropDawn from './WhenDropDawn'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import intl from 'react-intl-universal'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
} from '@/app/redux/searchInHeader/SearchSlice'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'

const WhenCome: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const [dateVieOnButtonSearch, setDateVieOnButtonSearch] = useState(
		//intl.get('addDate')
		'Додайте дату'
	)
	const [drop, setWhenDropDawn] = useState(false)

	const dispatch = useAppDispatch()
	const calendarDateComStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarDateDStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	useEffect(() => {
		btnState === SearchBtnEnum.WhenCome
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
		console.log(btnState)
	}, [btnState])

	useEffect(() => {
		if (calendarDateComStr !== '') {
			const calendarDate = new Date(calendarDateComStr)

			if (
				calendarDateDStr !== '' &&
				calendarDate > new Date(calendarDateDStr)
			) {
				dispatch(setWhenObjDateCome(calendarDateDStr))
				dispatch(setWhenObjDateOut(calendarDateComStr))
			} else {
				setDateVieOnButtonSearch(formatted(calendarDate))
				dispatch(setBtnState(SearchBtnEnum.Who))
			}
		} else {
			setDateVieOnButtonSearch(
				//intl.get('addDate')
				'Додайте дату'
			)
		}
	}, [calendarDateComStr])

	const clearDateOnButton = (event: any) => {
		if (dateVieOnButtonSearch !== 'Додайте дату') {
			event.preventDefault()
			dispatch(setWhenObjDateCome(''))
		}
	}
	const formatted = (date: Date): string => {
		const formatter = new Intl.DateTimeFormat(
			'uk', //TODO: заменить на нужный локаль	язык отображения даты
			{
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}
		)
		return formatter.format(date)
	}
	return (
		<>
			<button
				id='when'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				onClick={
					event => dispatch(setBtnState(SearchBtnEnum.WhenCome))
					// openDropDawn(event)
				}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-xs-2 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`m-0 ${style.colorOne}`}>Прибуття</p>
					<p className={`${style.colorTwo} m-0`}>{dateVieOnButtonSearch}</p>
				</div>
				{dateVieOnButtonSearch !==
					//intl.get('addDate')
					'Додайте дату' && <ClearInputBtn clearInput={clearDateOnButton} />}
			</button>
			{drop && <WhenDropDawn setWhenObjDate={setWhenObjDateCome} />}
		</>
	)
}

export default WhenCome
