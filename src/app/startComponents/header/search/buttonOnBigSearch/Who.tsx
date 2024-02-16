import { Col } from 'react-bootstrap'
import style from '../Search.module.css'
import {
	SearchBtnEnum,
	SearchDataState,
	ThemProps,
	WhoState,
} from '@/app/type/type'
import WhoDropDawn from './WhoDropDawn'
import { useEffect, useRef, useState } from 'react'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import {
	setWhoObjAnimalsCount,
	setWhoObjBabyCount,
	setWhoObjChildrenCount,
	setWhoObjGestCount,
} from '@/app/redux/searchInHeader/SearchSlice'
import { useTranslation } from 'react-i18next'

const Who: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const { t } = useTranslation()
	const [gestString, SetGestString] = useState(t('AddGuests'))
	const [isClearActive, setIsClearActive] = useState(false)
	const [drop, setWhenDropDawn] = useState(false)
	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	const whoObj = useAppSelector(
		state => state.searchReducer.DataSearchObj.whoObj
	)
	const clearWhoInput = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		dispatch(setWhoObjGestCount(0))
		dispatch(setWhoObjChildrenCount(0))
		dispatch(setWhoObjBabyCount(0))
		dispatch(setWhoObjAnimalsCount(0))
	}

	useEffect(() => {
		let str = `${whoObj.gestsCount + whoObj.childrenCount}`
		switch (str) {
			case '0':
				str = t('AddGuests')
				break
			case '1':
				str = t('Guest')
				break
			case '2':
			case '3':
				str = `${str} ${t('AGuests')}`
				break
			default:
				str = `${str} ${t('Guests')}`
				break
		}
		if (whoObj.babyCount > 0) {
			str = `${str}, ${whoObj.babyCount} ${t('Babies')} `
		}
		if (whoObj.animalsCount > 0) {
			str = `${str}, ${whoObj.animalsCount} ${t('Animals')} `
		}
		setIsClearActive(str !== t('AddGuests') ? true : false)
		SetGestString(() => {
			return str
		})
	}, [whoObj])

	useEffect(() => {
		btnState === SearchBtnEnum.Who
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
		console.log(btnState)
	}, [btnState])

	return (
		<>
			<div
				id='who'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				onClick={() => dispatch(setBtnState(SearchBtnEnum.Who))}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-xs-2 position-relative`}
					style={{ maxWidth: '170px', minWidth: '135px' }}
				>
					<p className={`${style.colorOne}  m-0`}>{t('Why')}</p>
					<p
						className={
							gestString === t('AddGuests')
								? `${style.colorTwo} text-truncate`
								: `${style.colorOne} m-0 text-truncate`
						}
						style={{ maxWidth: '95%' }}
					>
						{gestString}
					</p>
				</div>
				{isClearActive && <ClearInputBtn clearInput={clearWhoInput} />}
			</div>
			{drop && <WhoDropDawn />}
		</>
	)
}

export default Who
