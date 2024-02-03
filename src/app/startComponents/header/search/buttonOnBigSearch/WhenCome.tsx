import React from 'react'
import style from '../Search.module.css'
import { ThemProps } from '@/app/type/type'
interface WhenComeProps {
	isWhenDropOn?: boolean
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const WhenCome: React.FC<WhenComeProps & ThemProps> = ({
	isWhenDropOn,
	openDropDawn,
	isTeamBlack,
}) => {
	return (
		<button
			id='when'
			className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
				isTeamBlack && isWhenDropOn ? style.btnBlackBacActive : style.btnStyle
			} ${isTeamBlack && !isWhenDropOn && style.btnBlackBac}`}
			onClick={event => openDropDawn(event)}
		>
			<div
				className={`mt-3 mb-3 ps-4 ps-md-2 ${
					isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
				}`}
			>
				<p className={`m-0 ${style.colorOne}`}>Прибуття</p>
				<p className={`${style.colorTwo} m-0`}>Додайте дату</p>
			</div>
		</button>
	)
}

export default WhenCome
