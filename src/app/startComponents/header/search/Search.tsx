import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
import { FocusEvent, MouseEvent, use, useEffect, useRef, useState } from 'react'
import { ButtonOnBigDSearch, SearchKindSwitch } from '@/app/type/type'
import Where from './buttonOnBigSerch/Where'
// interface buttonFromSmallSearch {
// 	dropDawnBigScrollWithSearch: boolean
// 	setDropDawnBigScrollWithSearch: (value: boolean) => void
// }
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

	const dropdownWhereRef = useRef<HTMLDivElement>(null)
	const header = document.getElementById('header')

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
				dropdownWhereRef.current &&
				!dropdownWhereRef.current.contains(event.target as Node)
			) {
				document.removeEventListener('click', handleClickOutside)
				setWhereDrop(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isWhereDropOn])

	const handelScrollFromSmall = () => {
		console.log('Scrolll', scrollAfterSmallSearch)

		setScrollAfterSmallSearch(window.scrollY)
		console.log('setScrolllHandler', window.scrollY)
	}

	useEffect(() => {
		if (scrollAfterSmallSearch !== -1) {
			window.removeEventListener('scroll', handelScrollFromSmall)
			setSmallSearchOn(true)
			setBigSearchOn(false)
		}
	}, [scrollAfterSmallSearch])

	useEffect(() => {
		if (!isBigSearchOnBySmall && scroll !== 0) {
			setSmallSearchOn(true)
			setBigSearchOn(false)
		} else if (isBigSearchOnBySmall) {
			window.addEventListener('scroll', handelScrollFromSmall)
			setSmallSearchOn(false)
			setBigSearchOn(true)
		}
		return () => {
			window.removeEventListener('scroll', handelScrollFromSmall)
		}
	}, [scroll])

	return (
		<Row className={` ${style.main} text-end `} ref={dropdownWhereRef}>
			<Col
				className={` 
					d-flex align-items-start justify-content-center p-0 `}
			>
				<Where isWhereDropOn={isWhereDropOn} openDropDawn={openDropDawn} />
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`} id='whenOn'>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne}  m-0`}>Прибуття</p>
						<p className={`${style.colorTwo} m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`} id='whenOf'>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne} m-0`}>Виїзд</p>
						<p className={`${style.colorTwo}  m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`} id='who'>
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
			<div className={`${style.drop}${style.dNone} `}></div>
		</Row>
	)
}

export default Search
