import React, { useEffect, useState } from 'react'
import style from '../Search.module.css'
import { SearchBtnEnum, ThemProps } from '@/app/type/type'
import WhenDropDawn from './WhenDropDawn'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
} from '@/app/redux/searchInHeader/SearchSlice'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import { useTranslation } from 'react-i18next'

const WhenDeparture: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const calendarDateComStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarDateDStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)

	const [dateVieOnButtonSearch, setDateVieOnButtonSearch] = useState(
		t('AddADate')
	)
	const [drop, setWhenDropDawn] = useState(false)
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	useEffect(() => {
		btnState === SearchBtnEnum.WhenDeparture
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
		console.log(btnState)
	}, [btnState])
	useEffect(() => {
		if (calendarDateDStr !== '') {
			const calendarDateD = new Date(calendarDateDStr)

			if (
				calendarDateComStr !== '' &&
				calendarDateD < new Date(calendarDateComStr)
			) {
				dispatch(setWhenObjDateCome(calendarDateDStr))
				dispatch(setWhenObjDateOut(calendarDateComStr))
			} else {
				setDateVieOnButtonSearch(formatted(calendarDateD))
				dispatch(setBtnState(SearchBtnEnum.Who))
			}
		} else {
			setDateVieOnButtonSearch(t('AddADate'))
		}
	}, [dispatch, calendarDateDStr, calendarDateComStr])
	const clearDateOnButton = (event: any) => {
		if (dateVieOnButtonSearch !== t('AddADate')) {
			event.preventDefault()
			dispatch(setWhenObjDateOut(''))
		}
	}
	const formatted = (date: Date): string => {
		const formatter = new Intl.DateTimeFormat(
			t('locale'), //TODO: заменить на нужный локаль	язык отображения даты
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
			<div
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				id='whenD'
				onClick={() => dispatch(setBtnState(SearchBtnEnum.WhenDeparture))}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-xs-2  ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`${style.colorOne} m-0`}>{t('Departure')}</p>
					<p className={`${style.colorTwo}  m-0`}>{dateVieOnButtonSearch}</p>
				</div>
				{dateVieOnButtonSearch !== t('AddADate') && (
					<ClearInputBtn clearInput={clearDateOnButton} />
				)}
			</div>
			{drop && <WhenDropDawn setWhenObjDate={setWhenObjDateOut} />}
		</>
	)
}

export default WhenDeparture
