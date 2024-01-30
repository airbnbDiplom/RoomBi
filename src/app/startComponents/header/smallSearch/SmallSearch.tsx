import Image from 'next/image'
import style from './SmallSearch.module.css'
import { Col, Row } from 'react-bootstrap'
import { ButtonOnBigDSearch, SearchKindSwitch } from '@/app/type/type'
import { useEffect, useRef, useState } from 'react'
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
interface SetterScroll {
	setScrollTransfer: React.Dispatch<React.SetStateAction<number>>
}
const SmallSearch: React.FC<
	propsButtonOnBigDSearch & propsSearchKindSwitchP & SetterScroll
> = ({
	setScrollTransfer,
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
		setBigSearchOn,
		setBigSearchOnBySmall,
	} = propsKindSwitch

	const [scroll, setScroll] = useState(window.scrollY)

	const handler = () => {
		setScroll(window.scrollY)
	}
	useEffect(() => {
		window.addEventListener('scroll', handler)
		console.log(
			`isSmallSearchOn ${isSmallSearchOn}, isBigSearchOn ${isBigSearchOn}, isBigSearchOnBySmall${isBigSearchOnBySmall} `
		)
		return () => {
			//setScrollTransfer(window.scrollY)
			window.removeEventListener('scroll', handler)
		}
	}, [])

	useEffect(() => {
		if (scroll === 0) {
			window.removeEventListener('scroll', handler)

			if (smallSearch.current)
				smallSearch.current.classList.add(style.animateSmallToBig)
			setTimeout(() => {
				setSmallSearchOn(false)
				setBigSearchOn(true)
				setBigSearchOnBySmall(false)
			}, 150)
		}
	}, [scroll])

	const smallSearch = useRef<HTMLDivElement>(null)
	return (
		<Row className={` ${style.main}  p-0`} ref={smallSearch}>
			<Col
				className={` 
				d-flex align-items-center justify-content-center p-0`}
			>
				<button
					className={`p-0 ${style.resetButton}`}
					onClick={event => {
						event.preventDefault()
						if (smallSearch.current)
							smallSearch.current.classList.add(style.animateSmallToBig)
						setTimeout(() => {
							setSmallSearchOn(false)
							setBigSearchOnBySmall(true)
							setBigSearchOn(true)
							setWhenDrop(false)
							setWhoDrop(false)
							setWhereDrop(true)
						}, 150)

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
