import Image from 'next/image'
import style from './Search.module.css'
import { Col, Container, Row } from 'react-bootstrap'
const Search: React.FC = () => {
	return (
		<Row className={` ${style.main} text-end overflow-hidden`}>
			<Col
				className={` 
				d-flex align-items-start justify-content-center p-0 `}
			>
				<button
					className={`p-0 ${style.resetButton} ${style.btnStyle} text-start`}
				>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne}  m-0`}>Куди</p>
						<p className={`${style.colorTwo}  m-0`}>Пошук напрямку</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`}>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne}  m-0`}>Прибуття</p>
						<p className={`${style.colorTwo} m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`}>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne} m-0`}>Виїзд</p>
						<p className={`${style.colorTwo}  m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`}>
					<div className={`mt-3 mb-3 ps-4`}>
						<p className={`${style.colorOne}  m-0`}>Хто</p>
						<p className={`${style.colorTwo}  m-0`}>Додайте гостей</p>
					</div>
				</button>
			</Col>
			<Col
				xs={'auto'}
				sm={'auto'}
				md={'auto'}
				lg={'auto'}
				xl={'auto'}
				className={` ${style.cursor}  ${style.search} d-flex align-items-center justify-content-center m-1 p-0 '`}
			>
				<Image
					src={'/icon/search.svg'}
					width={20}
					height={20}
					alt='search icon'
				/>
			</Col>
		</Row>
	)
}

export default Search
