import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import {
	SearchDataState,
	SearchKindSwitch,
	ThemProps,
	SearchBtnEnum,
} from '@/app/type/type'
import Where from './buttonOnBigSearch/Where'
import Who from './buttonOnBigSearch/Who'
import WhenCome from './buttonOnBigSearch/WhenCome'
import WhenDeparture from './buttonOnBigSearch/WhenDeparture'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'

interface propsSearchKindSwitchP {
	propsKindSwitch: SearchKindSwitch
}
interface TeamSetter {
	setTeamBlack: (setTeamBlack: boolean) => void
}
const Search: React.FC<TeamSetter & propsSearchKindSwitchP & ThemProps> = ({
	setTeamBlack,

	propsKindSwitch: propsKindSwitch,
	isTeamBlack,
}) => {
	const {
		isBigSearchOnBySmall,
		setSmallSearchOn,
		setBigSearchOn,
		setBigSearchOnBySmall,
	} = propsKindSwitch

	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)

	const [scroll, setScroll] = useState(Number)
	const [scrollAfterSmallSearch, setScrollAfterSmallSearch] = useState(-1)
	const [flag, setFlag] = useState(false)

	const searchBig = useRef<HTMLDivElement>(null)

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
					dispatch(setBtnState(SearchBtnEnum.DisableAll))
				} else if (isBigSearchOnBySmall) {
					dispatch(setBtnState(SearchBtnEnum.DisableAll))
					searchBig?.current.classList.add(style.animateBigToSmall)
					setTimeout(() => {
						setBigSearchOn(false)
						setBigSearchOnBySmall(false)
						setSmallSearchOn(true)
					}, 150)
				}
			}
		}
		if (btnState !== SearchBtnEnum.DisableAll)
			document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [dispatch, btnState])

	const handelScrollFromSmall = () => {
		if (flag) setScrollAfterSmallSearch(window.scrollY)
		setFlag(true)
	}

	useEffect(() => {
		if (scrollAfterSmallSearch !== -1) {
			window.removeEventListener('scroll', handelScrollFromSmall)
			if (searchBig.current)
				searchBig.current.classList.add(style.animateBigToSmall)
			dispatch(setBtnState(SearchBtnEnum.DisableAll))
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
			dispatch(setBtnState(SearchBtnEnum.DisableAll))
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
			<Col className={`${style.searchStyleBtn} p-0`}>
				<Where setTeamBlack={setTeamBlack} isTeamBlack={isTeamBlack} />
			</Col>
			<Col className={`${style.searchStyleBtn} p-0`}>
				<WhenCome isTeamBlack={isTeamBlack} />
			</Col>
			<Col className={`${style.searchStyleBtn} p-0`}>
				<WhenDeparture isTeamBlack={isTeamBlack} />
			</Col>
			<Col className={`${style.searchStyleBtn} p-0`}>
				<Who isTeamBlack={isTeamBlack} />
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
		// <div className={style.searchAllContainer}>
		// 	<div className={`${style.item} ${style.item_1}`}>1</div>
		// 	<div className={`${style.item} ${style.item_2}`}>2</div>
		// 	<div className={`${style.item} ${style.item_3}`}>3</div>
		// 	<div className={`${style.item} ${style.item_4}`}>4</div>
		// 	<div className={`${style.item} ${style.item_5}`}>5</div>
		// </div>
	)
}

export default Search
