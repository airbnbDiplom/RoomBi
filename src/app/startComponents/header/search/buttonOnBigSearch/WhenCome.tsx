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
import { useTranslation } from 'react-i18next'

const WhenCome: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const { t } = useTranslation()

	const [dateVieOnButtonSearch, setDateVieOnButtonSearch] = useState(
		t('AddADate')
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
				dispatch(setBtnState(SearchBtnEnum.WhenDeparture))
			}
		} else {
			setDateVieOnButtonSearch(t('AddADate'))
		}
	}, [calendarDateComStr])

	const clearDateOnButton = (event: any) => {
		if (dateVieOnButtonSearch !== t('AddADate')) {
			event.preventDefault()
			dispatch(setWhenObjDateCome(''))
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
				id='when'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				onClick={() => dispatch(setBtnState(SearchBtnEnum.WhenCome))}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-md-4 ps-xs-2 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`m-0 ${style.colorOne}`}>{t('Arrival')}</p>
					<p className={`${style.colorTwo} m-0`}>{dateVieOnButtonSearch}</p>
				</div>
				{dateVieOnButtonSearch !== t('AddADate') && (
					<ClearInputBtn clearInput={clearDateOnButton} />
				)}
			</div>
			{drop && <WhenDropDawn setWhenObjDate={setWhenObjDateCome} />}
		</>
	)
}

export default WhenCome
