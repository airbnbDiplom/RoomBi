import { ThemProps, SearchBtnEnum, AutoCompleteList } from '@/app/type/type'
import autoCompleteService from '@/app/services/autoCompleteService'
import style from '../Search.module.css'
import WhereDropDawn from './WhereDropDawn'
import { useEffect, useRef, useState } from 'react'
import WhereOptionDropDawn from './WhereOptionDropDawn'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import { setWhereEmptyObj } from '@/app/redux/searchInHeader/SearchSlice'

interface whereProps {
	setTeamBlack: (setWhenDrop: boolean) => void
}
const Where: React.FC<whereProps & ThemProps> = ({
	setTeamBlack,
	isTeamBlack,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [autoList, setAutoList] = useState<AutoCompleteList>(
		{} as AutoCompleteList
	)

	const [drop, setWhenDropDawn] = useState(false)
	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	const stateString = useAppSelector(state =>
		state.searchReducer.DataSearchObj.whereObj?.properties?.display_name ===
		undefined
			? ''
			: state.searchReducer.DataSearchObj.whereObj?.properties?.display_name
	)

	const [stringInput, setStringInput] = useState(
		stateString !== '' ? stateString : ''
	)

	const [whereOptionBlack, setWhereOptionBlack] = useState(false)
	useEffect(() => {
		btnState === SearchBtnEnum.Where
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
	}, [btnState, isTeamBlack])
	useEffect(() => {
		if (inputRef.current && isTeamBlack) inputRef.current.focus()
		if (inputRef.current && !isTeamBlack) inputRef.current.blur()
	}, [isTeamBlack])
	const clearDateOnButton = (event: any) => {
		event.preventDefault()
		event.stopPropagation()
		setStringInput('')
		dispatch(setWhereEmptyObj())
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > 2) {
			autoCompleteService(event.target.value).then(
				(data: AutoCompleteList | null) => {
					if (data) {
						setAutoList(data)
					} else {
						console.log('Where handleInputChange No data fetched.')
					}
				}
			)
		}
		setStringInput(event.target.value)

		setWhereOptionBlack(true)

		setTeamBlack(true)
	}

	return (
		<>
			<div
				id='where'
				onClick={(event: React.MouseEvent<HTMLDivElement>) => {
					if ((event.target as HTMLElement).tagName === 'INPUT') {
						return
					}
					dispatch(setBtnState(SearchBtnEnum.Where))
				}}
				className={`p-0 ${style.resetButton} ${style.pText} ${
					(isTeamBlack && drop) || whereOptionBlack
						? style.btnBlackBacActive
						: style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac} text-start`}
			>
				<div
					className={` mt-3 mb-3 ps-lg-4 ps-xs-2 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`m-0 ${style.colorOne}`}>Куди</p>
					<input
						id='inputWhere'
						ref={inputRef}
						type='text'
						autoComplete='off'
						onFocus={() => {
							if (!isTeamBlack) {
								setTeamBlack(true)
								dispatch(setBtnState(SearchBtnEnum.Where))
							}
						}}
						placeholder='Пошук напрямку'
						className={`${style.colorTwo} ${style.inputReset} m-0`}
						value={stringInput}
						onChange={handleInputChange}
					/>
				</div>
				{stringInput !== undefined && stringInput.length > 0 && (
					<ClearInputBtn clearInput={clearDateOnButton} />
				)}
			</div>
			{drop && stringInput !== undefined && stringInput.length === 0 && (
				<WhereDropDawn setStringInput={setStringInput} />
			)}

			{whereOptionBlack &&
				stringInput.length > 2 &&
				autoList.features !== undefined &&
				autoList.features.length > 0 && (
					<WhereOptionDropDawn
						setWhereOptionBlack={setWhereOptionBlack}
						autoList={autoList}
						setStringInput={setStringInput}
					/>
				)}
		</>
	)
}

export default Where
