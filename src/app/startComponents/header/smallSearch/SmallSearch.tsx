import Image from 'next/image'
import style from './SmallSearch.module.css'
import { Col, Row } from 'react-bootstrap'
import { ButtonOnBigDSearch, SearchKindSwitch } from '@/app/type/type'
interface HederComponentProps {
	setScroll: (setScroll: boolean) => void
	setDropDawnScroll: (setDropDawnScroll: boolean) => void
}

interface propsButtonOnBigDSearch {
	propsBigSearch: ButtonOnBigDSearch
}
interface propsSearchKindSwitchP {
	propsKindSwitch: SearchKindSwitch
}

const SmallSearch: React.FC<
	propsButtonOnBigDSearch & propsSearchKindSwitchP
> = ({
	propsBigSearch: propsBigSearchBtn,
	propsKindSwitch: propsKindSwitch,
}) => {
	const {
		isWhereDropOn,
		isWhenDropOn,
		isWhoDropOn,
		setWhereDrop,
		setWhenDrop,
		setWhoDrop,
	} = propsBigSearchBtn
	const {
		isSmallSearchOn,
		isBigSearchOn,
		isBigSearchOnBySmall,
		setSmallSearchOn,
		serBigSearchOn,
		setBigSearchOnBySmall,
	} = propsKindSwitch

	return (
		<Row className={` ${style.main}  p-0`}>
			<Col
				className={` 
				d-flex align-items-center justify-content-center p-0`}
			>
				<button
					className={`p-0 ${style.resetButton}`}
					onClick={event => {
						event.preventDefault()
						setWhenDrop(false)
						setWhoDrop(false)
						setWhereDrop(true)
						setSmallSearchOn(false)
						serBigSearchOn(true)
						setBigSearchOnBySmall(true)
						if (document.getElementById('where'))
							document.getElementById('where')?.click()
					}}
				>
					<div className={`mt-3 mb-3 me-1 p-0 ${style.border}`}>Будь куди</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton}`}>
					<div className={`mt-3 mb-3 me-1 pe-1 p-0 ${style.border}`}>
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
