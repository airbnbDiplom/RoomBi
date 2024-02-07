import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import {
	SearchDataState,
	ButtonOnBigDSearch,
	SearchKindSwitch,
	ThemProps,
} from '@/app/type/type'
import Where from './buttonOnBigSearch/Where'
import Who from './buttonOnBigSearch/Who'
import WhenCome from './buttonOnBigSearch/WhenCome'
import WhenDeparture from './buttonOnBigSearch/WhenDeparture'

interface propsButtonOnBigDSearch {
	propsBigSearch: ButtonOnBigDSearch
}
interface propsSearchKindSwitchP {
	propsKindSwitch: SearchKindSwitch
}
interface SearchDataProps {
	searchData: SearchDataState
	setSearchData: React.Dispatch<React.SetStateAction<SearchDataState>>
}
interface TeamSetter {
	setTeamBlack: (setTeamBlack: boolean) => void
}

const Search: React.FC<
	SearchDataProps &
		TeamSetter &
		propsButtonOnBigDSearch &
		propsSearchKindSwitchP &
		ThemProps
> = ({
	setTeamBlack,
	searchData,
	setSearchData,
	propsBigSearch: propsBigSearchBtn,
	propsKindSwitch: propsKindSwitch,
	isTeamBlack,
}) => {
	const {
		isWhereDropOn,
		isWhenDropOn,
		isWhoDropOn,
		isWhenDDropOn,
		setWhereDrop,
		setWhenDrop,
		setWhoDrop,
		setWhenDDrop,
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

	const searchBig = useRef<HTMLDivElement>(null)

	const openDropDawn = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		switch (event.currentTarget.id) {
			case 'where':
				console.log('event.currentTarget', event.currentTarget.id)
				setWhereDrop(!isWhereDropOn)
				setWhoDrop(false)
				setWhenDrop(false)
				setWhenDDrop!(false)
				break
			case 'who':
				setWhoDrop(!isWhoDropOn)
				setWhereDrop(false)
				setWhenDrop(false)
				setWhenDDrop!(false)
				break
			case 'when':
				setWhenDrop(!isWhenDropOn)
				setWhereDrop(false)
				setWhoDrop(false)
				setWhenDDrop!(false)
				break
			case 'whenD':
				setWhenDDrop!(!isWhenDDropOn)
				setWhereDrop(false)
				setWhoDrop(false)
				setWhenDrop(false)
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
					setWhenDDrop!(false)
				} else if (isBigSearchOnBySmall) {
					setWhereDrop(false)
					setWhenDrop(false)
					setWhoDrop(false)
					setWhenDDrop!(false)
					searchBig?.current.classList.add(style.animateBigToSmall)
					setTimeout(() => {
						setBigSearchOn(false)
						setBigSearchOnBySmall(false)
						setSmallSearchOn(true)
					}, 150)
				}
			}
		}
		if (isWhereDropOn || isWhoDropOn || isWhenDropOn || isWhenDDropOn)
			document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isWhereDropOn, isWhoDropOn, isWhenDropOn, isWhenDDropOn])

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
			setWhenDDrop!(false)
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
			setWhenDDrop!(false)
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
		<Row
			className={` ${style.main}  ${
				isTeamBlack ? style.borderWhite : style.borderBlack
			} text-end `}
			ref={searchBig}
		>
			<Col
				className={` 
					d-flex align-items-start justify-content-center p-0 `}
			>
				<Where
					setTeamBlack={setTeamBlack}
					setWhenDrop={setWhenDrop}
					setWhereDrop={setWhereDrop}
					whereObj={searchData.whereObj}
					setSearchData={setSearchData}
					isWhereDropOn={isWhereDropOn}
					openDropDawn={openDropDawn}
					isTeamBlack={isTeamBlack}
				/>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<WhenCome
					isWhenDropOn={isWhenDropOn}
					openDropDawn={openDropDawn}
					isTeamBlack={isTeamBlack}
				/>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<WhenDeparture
					isWhenDDropOn={isWhenDDropOn}
					isWhenDropOn={isWhenDropOn}
					openDropDawn={openDropDawn}
					isTeamBlack={isTeamBlack}
				/>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<Who
					searchData={searchData}
					setSearchData={setSearchData}
					isWhoDropOn={isWhoDropOn}
					openDropDawn={openDropDawn}
					isTeamBlack={isTeamBlack}
				/>
			</Col>
			<Col
				xs={1}
				sm={1}
				md={1}
				lg={1}
				xl={1}
				className={` ${style.cursor}  ${style.search} d-flex align-items-center justify-content-center m-1 p-0 '`}
			>
				<Image
					src={'/icon/search.svg'}
					width={30}
					height={30}
					alt='search icon'
				/>
			</Col>
			<div className={`${style.drop}${style.dNone} `}></div>
		</Row>
	)
}

export default Search
