import style from '../Search.module.css'
import WhereDropDawn from './WhereDropDawn'
interface whereProps {
	isWhereDropOn: boolean
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Where: React.FC<whereProps> = ({ isWhereDropOn, openDropDawn }) => {
	return (
		<>
			<button
				id='where'
				onClick={event => openDropDawn(event)}
				className={`p-0 ${style.resetButton} ${style.btnStyle} text-start`}
			>
				<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
					<p className={`${style.colorOne}  m-0`}>Куди</p>
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
