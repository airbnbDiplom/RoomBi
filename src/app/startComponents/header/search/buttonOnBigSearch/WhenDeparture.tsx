import React from 'react'
import style from '../Search.module.css'
import { ThemProps } from '@/app/type/type'
interface WhenComeProps {
	isWhenDDropOn?: boolean
	isWhenDropOn?: boolean
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
}

//TODO: как-то включать и  выключать кнопку
const WhenDeparture: React.FC<WhenComeProps & ThemProps> = ({
	isWhenDDropOn,
	isWhenDropOn,
	openDropDawn,
	isTeamBlack,
}) => {
	return (
		<button
			className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
				isTeamBlack && isWhenDDropOn ? style.btnBlackBacActive : style.btnStyle
			} ${isTeamBlack && !isWhenDDropOn && style.btnBlackBac}`}
			id='whenD'
			onClick={event => openDropDawn(event)}
		>
			<div
				className={`mt-3 mb-3 ps-lg-4 ps-xs-2  ${
					isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
				}`}
			>
				<p className={`${style.colorOne} m-0`}>Виїзд</p>
				<p className={`${style.colorTwo}  m-0`}>Додайте дату</p>
			</div>
		</button>
	)
}

export default WhenDeparture
