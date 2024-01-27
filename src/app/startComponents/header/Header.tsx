'use client'

import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'
import { ShowMapBtn } from '@/app/ui/showMap/showMapBtn'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
//import planet from '../../../../public/icon/planet.svg'
import style from './Header.module.css'
import SmallSearch from './smallSearch/SmallSearch'
import Search from './search/Search'
import { tree } from 'next/dist/build/templates/app-page'

const Header: FC = () => {
	//переключение между видами поика
	const [isSmallSearchOn, setSmallSearchOn] = useState(false)
	const [isBigSearchOn, setBigSearchOn] = useState(true)
	const [isBigSearchOnBySmall, setBigSearchOnBySmall] = useState(false)
	// переключатель кнопок на большом поиске
	const [isWhereDropOn, setWhereDrop] = useState(false)
	const [isWhenDropOn, setWhenDrop] = useState(false)
	const [isWhoDropOn, setWhoDrop] = useState(false)
	const [scroll, setScroll] = useState(Number)
	// const [dropDawnBigScrollWithSearch, setDropDawnBigScrollWithSearch] =
	// 	useState(false)

	const header = document.getElementById('header')
	const filterNaw = document.getElementById('filter')
	//проверка scroll для замены поля поиска
	const handlerScroll = () => {
		console.log('1212')
		if (window.scrollY === 0) {
			setBigSearchOn(true)
			setSmallSearchOn(false)
			setBigSearchOnBySmall(false)
		} else if (window.scrollY != 0 && isBigSearchOnBySmall) {
			setBigSearchOn(true)
			setSmallSearchOn(false)
			setBigSearchOnBySmall(false)
		} else if (window.scrollY != 0 && !isBigSearchOnBySmall) {
			setBigSearchOn(false)
			setSmallSearchOn(true)
			setWhereDrop(false)
			setWhenDrop(false)
			setWhoDrop(false)
		} else {
			setBigSearchOn(false)
			setSmallSearchOn(true)
			setWhereDrop(false)
			setWhenDrop(false)
			setWhoDrop(false)
		}

		//else if (dropDawnBigScrollWithSearch) setScroll(false)
		//else setScroll(true)

		//
		// if (
		// 	window.scrollY != 0 &&
		// 	header?.classList.contains('headerBackgroundBra')
		// )
		// 	header?.classList.replace('headerBackgroundBra', 'headerBackgroundWhite')
		// if (filterNaw) filterNaw.style.display = 'flex'
		// if (header) header.style.paddingBottom = '0px'
	}

	function throttle<F extends (...args: any[]) => any>(
		func: F,
		limit: number
	): (...args: Parameters<F>) => void {
		let inThrottle: boolean
		return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
			if (!inThrottle) {
				func.apply(this, args)
				inThrottle = true
				setTimeout(() => (inThrottle = false), limit)
			}
		}
	}

	// function debounce<F extends (...args: any[]) => void>(
	// 	func: F,
	// 	delay: number
	// ): (...args: Parameters<F>) => void {
	// 	let inDebounce: ReturnType<typeof setTimeout> | undefined

	// 	return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
	// 		clearTimeout(inDebounce)
	// 		inDebounce = setTimeout(() => func.apply(this, args), delay)
	// 	}
	// }
	// // const debouncedHandleScroll = debounce(handlerScroll, 200)
	// // window.addEventListener('scrollend', debouncedHandleScroll)

	const throttleHandleScroll = throttle(handlerScroll, 500)
	window.addEventListener('scrollend', handlerScroll)

	// useEffect(() => {
	// 	if (isSmallSearchOn) {
	// 		//start animation big to small
	// 	}
	// }, [isSmallSearchOn, isBigSearchOn])

	// useEffect(() => {
	// window.addEventListener('scroll', handlerScroll)	return () => {
	// 	window.removeEventListener('scroll', handlerScroll)
	// 	}
	// 	setScroll(scroll)
	// 	}, [scroll])

	return (
		<Container fluid className='pt-5 position-sticky' id='header'>
			<Row className='d-flex align-items-center'>
				<Col
					className={style.customTextCenter}
					// sm={2}
					md={2}
					lg={4}
					xl={3}
				>
					<Link href={'/'} className={style.logo}>
						RoomBi
					</Link>
				</Col>
				<Col
					className={`${
						isSmallSearchOn ? style.Visibility : style.VisibilityNone
					} ${style.customDisplayNone} ${style.flexCenter}`}
				>
					<SmallSearch
						propsBigSearch={{
							isWhereDropOn,
							isWhenDropOn,
							isWhoDropOn,
							setWhereDrop,
							setWhenDrop,
							setWhoDrop,
						}}
						propsKindSwitch={{
							isSmallSearchOn,
							isBigSearchOn,
							isBigSearchOnBySmall,
							setSmallSearchOn,
							serBigSearchOn: setBigSearchOn,
							setBigSearchOnBySmall,
						}}
					/>
				</Col>
				<Col
					className={` ${
						isBigSearchOn ? style.Visibility : style.VisibilityNone
					} ${style.customDisplayNone} `}
				>
					<Search
						propsBigSearch={{
							isWhereDropOn,
							isWhenDropOn,
							isWhoDropOn,
							setWhereDrop,
							setWhenDrop,
							setWhoDrop,
						}}
						propsKindSwitch={{
							isSmallSearchOn,
							isBigSearchOn,
							isBigSearchOnBySmall,
							setSmallSearchOn,
							serBigSearchOn: setBigSearchOn,
							setBigSearchOnBySmall,
						}}
					/>
				</Col>
				<Col
					//sx={12} sm={10}
					md={4}
					lg={4}
					xl={3}
				>
					<Row className='d-flex align-items-center justify-content-end'>
						<Col
							className={`ms-3 ${style.customText}`}
							// sx={8}
							// sm={8}
							// md={8}
							// lg={10}
							//xl={4}
						>
							<Link className={`${style.customText} ${style.link}`} href='/#'>
								Запропонувати помешкання на <strong>RoomBi</strong>
							</Link>
						</Col>
						{/* <Col
							className={style.planet}
							// sx={'auto'}
							// sm={'auto'}
							// md={'auto'}
							// lg={'auto'}
							// xl={'auto'}
						>
							<Image
								priority
								src={planet}
								alt='languages'
								height={12}
								width={12}
							/>
						</Col> */}
						<Col
							className={`${style.customTextCenter} ${style.customDisplayNone} `}
							// sx={3}
							// sm={3}
							// md={3}
							// lg={1}
							// xl={1}
						>
							<AuthenticationBtn />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
export { Header }
