import Image from 'next/image'
import style from './SmallSearch.module.css'
import { Col, Row } from 'react-bootstrap'
const SmallSearch: React.FC = () => {
	return (
		<Row className={` ${style.main} text-end p-0`}>
			<Col
				className={` 
				d-flex align-items-center justify-content-center p-0`}
			>
				<button className={`p-0 ${style.resetButton}`}>
					<div className={`mt-3 mb-3 p-0 ${style.border}`}>Будь куди</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton}`}>
					<div className={`mt-3 mb-3 p-0 ${style.border}`}>
						Будь-який тиждень
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton}`}>
					<div className={`mt-3 mb-3 p-0`}>Додаты гостей</div>
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

export default SmallSearch
