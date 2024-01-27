import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
import { FocusEvent, MouseEvent, useEffect, useRef, useState } from 'react'
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
const Search: React.FC<propsButtonOnBigDSearch & propsSearchKindSwitchP> = ({
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
	const dropdownWhereRef = useRef<HTMLDivElement>(null)
	const header = document.getElementById('header')

	// const toggleNaw = () => {
	// 	const filterNaw = document.getElementById('filter')
	// 	if (filterNaw && whereDrop) {
	// 		filterNaw.style.display = 'none'
	// 		if (header) header.style.paddingBottom = '70px'
	// 	} else if (filterNaw && !whereDrop) {
	// 		filterNaw.style.display = 'flex'
	// 		if (header) header.style.paddingBottom = '0px'
	// 	}
	// }

	const openDropDawn = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		switch (event.currentTarget.id) {
			case 'where':
				setWhereDrop(!isWhereDropOn)
				break
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (
				dropdownWhereRef.current &&
				!dropdownWhereRef.current.contains(event.target as Node)
			) {
				console.log(`here`)
				document.removeEventListener('click', handleClickOutside)
				setWhereDrop(false)
				//	setDropDawnBigScrollWithSearch(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
	}, [isWhereDropOn])

	// useEffect(() => {
	// 	// обработчик для сброса цвета Header при нажатии за приделы
	// 	//выпадающего окна
	// 	const handleClickOutside = (event: any) => {
	// 		if (
	// 			dropdownWhereRef.current &&
	// 			!dropdownWhereRef.current.contains(event.target as Node)
	// 		) {
	// 			console.log(`here`)
	// 			document.removeEventListener('click', handleClickOutside)
	// 			setWhereDrop(false)
	// 			//	setDropDawnBigScrollWithSearch(false)
	// 		}
	// 	}
	// 	if (whereDrop) document.addEventListener('click', handleClickOutside)
	// 	//Изменение цвета в Header

	// 	changeTeam()
	// 	//скрытие фильтров
	// 	toggleNaw()
	// 	// Return cleanup function
	// }, [whereDrop, whenDrop, WhoDrop])
	// const changeTeam = () => {
	// 	if (
	// 		(whereDrop || whenDrop || WhoDrop) &&
	// 		header?.classList.contains('headerBackgroundWhite')
	// 	)
	// 		header?.classList.replace('headerBackgroundWhite', 'headerBackgroundBra')
	// 	else if (
	// 		!whereDrop &&
	// 		!whenDrop &&
	// 		!WhoDrop &&
	// 		header?.classList.contains('headerBackgroundBra')
	// 	)
	// 		header?.classList.replace('headerBackgroundBra', 'headerBackgroundWhite')
	// }

	function searchInFocus(event: React.MouseEvent<HTMLButtonElement>) {
		openDropDawn(event)
	}

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
