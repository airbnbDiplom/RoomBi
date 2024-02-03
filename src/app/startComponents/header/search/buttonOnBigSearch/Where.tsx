import { ThemProps } from '@/app/type/type'
import style from '../Search.module.css'
import WhereDropDawn from './WhereDropDawn'
interface whereProps {
	isWhereDropOn?: boolean
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Where: React.FC<whereProps & ThemProps> = ({
	isWhereDropOn,
	openDropDawn,
	isTeamBlack,
}) => {
	return (
		<>
			<button
				id='where'
				onClick={event => openDropDawn(event)}
				className={`p-0 ${style.resetButton} ${style.pText} ${
					isTeamBlack && isWhereDropOn
						? style.btnBlackBacActive
						: style.btnStyle
				} ${isTeamBlack && !isWhereDropOn && style.btnBlackBac} text-start`}
			>
				<div
					className={` mt-3 mb-3 ps-4 ps-md-2 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`m-0 ${style.colorOne}`}>Куди</p>
					<input
						type='text'
						placeholder='Пошук напрямку'
						className={`${style.colorTwo} ${style.inputReset}  m-0`}
					/>
				</div>
			</button>
			<WhereDropDawn isWhereDropOn={isWhereDropOn} />
		</>
	)
}

export default Where
