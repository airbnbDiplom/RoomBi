import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
import { FocusEvent, MouseEvent, use, useEffect, useRef, useState } from 'react'
import { ButtonOnBigDSearch, SearchKindSwitch } from '@/app/type/type'
import Where from './buttonOnBigSerch/Where'

interface propsButtonOnBigDSearch {
	propsBigSearch: ButtonOnBigDSearch
}
interface propsSearchKindSwitchP {
	propsKindSwitch: SearchKindSwitch
}
interface ScrollTransf {
	scrollTransfer: number
}

const Search: React.FC<
	propsButtonOnBigDSearch & propsSearchKindSwitchP & ScrollTransf
> = ({
	scrollTransfer,
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

	const [scroll, setScroll] = useState(Number)
	const [scrollAfterSmallSearch, setScrollAfterSmallSearch] = useState(-1)
	const [flag, setFlag] = useState(false)

	//const dropdownWhereRef = useRef<HTMLDivElement>(null)
	const searchBig = useRef<HTMLDivElement>(null)

	const openDropDawn = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		switch (event.currentTarget.id) {
			case 'where':
				setWhereDrop(!isWhereDropOn)
				break
		}
	}
	useEffect(() => {
		const handler = () => {
			setScroll(window.scrollY)
			window.removeEventListener('scroll', handler)
		}

		window.addEventListener('scroll', handler)
		return () => {
			window.removeEventListener('scroll', handler)
		}
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (
				searchBig.current &&
				!searchBig.current.contains(event.target as Node)
			) {
				if (!isBigSearchOnBySmall) {
					document.removeEventListener('click', handleClickOutside)
					setWhereDrop(false)
					setWhenDrop(false)
					setWhoDrop(false)
				} else if (isBigSearchOnBySmall) {
					setWhereDrop(false)
					setWhenDrop(false)
					setWhoDrop(false)
					searchBig?.current.classList.add(style.animateBigToSmall)
					setTimeout(() => {
						setBigSearchOn(false)
						setBigSearchOnBySmall(false)
						setSmallSearchOn(true)
					}, 150)
				}
			}
		}
		if (isWhereDropOn) document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isWhereDropOn])

	const handelScrollFromSmall = () => {
		if (flag) setScrollAfterSmallSearch(window.scrollY)
		setFlag(true)
	}

	useEffect(() => {
		if (scrollAfterSmallSearch !== -1) {
			window.removeEventListener('scroll', handelScrollFromSmall)
			if (searchBig.current)
				searchBig.current.classList.add(style.animateBigToSmall)
			setWhereDrop(false)
			setWhenDrop(false)
			setWhoDrop(false)
			setTimeout(() => {
				setSmallSearchOn(true)
				setBigSearchOn(false)
			}, 150)
		}
	}, [scrollAfterSmallSearch])

	useEffect(() => {
		if (!isBigSearchOnBySmall && scroll !== 0) {
			//анимация старт
			if (searchBig.current)
				searchBig?.current.classList.add(style.animateBigToSmall)
			setWhereDrop(false)
			setWhenDrop(false)
			setWhoDrop(false)
			setTimeout(() => {
				setSmallSearchOn(true)
				setBigSearchOn(false)
			}, 150)
		} else if (isBigSearchOnBySmall) {
			window.addEventListener('scroll', handelScrollFromSmall)
		}
		return () => {
			window.removeEventListener('scroll', handelScrollFromSmall)
		}
	}, [scroll])

	return (
		<Row className={` ${style.main} text-end `} ref={searchBig}>
			<Col
				className={` 
					d-flex align-items-start justify-content-center p-0 `}
			>
				<Where isWhereDropOn={isWhereDropOn} openDropDawn={openDropDawn} />
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`} id='whenOn'>
					<div className={`mt-1 mb-1 ps-4 ${style.border}`}>
						<p className={`${style.colorOne}  m-0`}>Прибуття</p>
						<p className={`${style.colorTwo} m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`} id='whenOf'>
					<div className={`mt-1 mb-1 ps-4 ${style.border}`}>
						<p className={`${style.colorOne} m-0`}>Виїзд</p>
						<p className={`${style.colorTwo}  m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`} id='who'>
					<div className={`mt-1 mb-1 ps-4`}>
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
			<div className={`${style.drop}${style.dNone} `}></div>
		</Row>
	)
}

export default Search
