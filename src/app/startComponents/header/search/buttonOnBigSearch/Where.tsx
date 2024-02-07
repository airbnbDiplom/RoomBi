import { SearchDataState, ThemProps, WhereState } from '@/app/type/type'
import style from '../Search.module.css'
import WhereDropDawn from './WhereDropDawn'
import { useRef, useState } from 'react'
import WhereOptionDropDawn from './WhereOptionDropDawn'

interface whereProps {
	setTeamBlack: (setWhenDrop: boolean) => void
	setWhenDrop: (setWhenDrop: boolean) => void
	setWhereDrop: (setWhereDrop: boolean) => void
	whereObj: WhereState
	setSearchData: React.Dispatch<React.SetStateAction<SearchDataState>>
	isWhereDropOn?: boolean
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Where: React.FC<whereProps & ThemProps> = ({
	setTeamBlack,
	setWhenDrop,
	setWhereDrop,
	whereObj,
	setSearchData,
	isWhereDropOn,
	openDropDawn,
	isTeamBlack,
}) => {
	const inputRef = useRef(null)
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStringInput(event.target.value)
		setWhereOptionBlack(true)

		setTeamBlack(true)
		console.log(event.target.value)
		//	setSearchData(event.target.value)
	}
	const [stringInput, setStringInput] = useState('')
	const [whereOptionBlack, setWhereOptionBlack] = useState(false)

	return (
		<>
			<button
				id='where'
				onClick={event => openDropDawn(event)}
				className={`p-0 ${style.resetButton} ${style.pText} ${
					(isTeamBlack && isWhereDropOn) || whereOptionBlack
						? style.btnBlackBacActive
						: style.btnStyle
				} ${isTeamBlack && !isWhereDropOn && style.btnBlackBac} text-start`}
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
						placeholder='Пошук напрямку'
						className={`${style.colorTwo} ${style.inputReset}  m-0`}
						value={stringInput}
						onChange={handleInputChange}
					/>
				</div>
			</button>
			<WhereDropDawn
				setWhenDrop={setWhenDrop}
				setWhereDrop={setWhereDrop}
				stringInput={stringInput}
				setStringInput={setStringInput}
				isWhereDropOn={isWhereDropOn}
				setSearchData={setSearchData}
			/>

			{whereOptionBlack && stringInput.length > 0 && <WhereOptionDropDawn />}
		</>
	)
}

export default Where
