import Image from 'next/image'
import style from './SmallSearch.module.css'
import { Col, Row } from 'react-bootstrap'
import { SearchBtnEnum, SearchKindSwitch } from '@/app/type/type'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import { useTranslation } from 'react-i18next'
import { divIcon } from 'leaflet'
interface Props {
	width: number
}

const SmallSearch: React.FC<SearchKindSwitch & Props> = ({
	width,
	setSmallSearchOn,
	setBigSearchOn,
	setBigSearchOnBySmall,
}) => {
	const { t } = useTranslation()
	const [scroll, setScroll] = useState(window.scrollY)
	const smallSearch = useRef<HTMLDivElement>(null)

	const handler = () => {
		setScroll(window.scrollY)
	}
	const dispatch = useAppDispatch()
	useEffect(() => {
		window.addEventListener('scroll', handler)
		return () => {
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
	}, [scroll, setBigSearchOn, setBigSearchOnBySmall, setSmallSearchOn])

	const mobileEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setTimeout(() => {
			setSmallSearchOn(false)
			setBigSearchOnBySmall(true)
			setBigSearchOn(true)
		}, 150)
	}
	const clickOpenDropDawnInBigSearch = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		options: string
	) => {
		event.preventDefault()
		if (smallSearch.current)
			smallSearch.current.classList.add(style.animateSmallToBig)
		setTimeout(() => {
			setSmallSearchOn(false)
			setBigSearchOnBySmall(true)
			setBigSearchOn(true)
			console.log(options)
			switch (options) {
				case 'whereSmall':
					dispatch(setBtnState(SearchBtnEnum.Where))
					if (document.getElementById('where'))
						document.getElementById('where')?.click()
					break
				case 'whenSmall':
					dispatch(setBtnState(SearchBtnEnum.WhenCome))
					if (document.getElementById('when'))
						document.getElementById('when')?.click()
					break
				case 'whoSmall':
					dispatch(setBtnState(SearchBtnEnum.Who))
					if (document.getElementById('who'))
						document.getElementById('who')?.click()
					break
			}
		}, 150)
	}

	return (
		<>
			{width > 560 ? (
				<Row className={` ${style.main}  p-0`} ref={smallSearch}>
					<Col
						className={` 
				d-flex align-items-center justify-content-center p-0`}
					>
						<button
							className={`p-0 ${style.resetButton}`}
							onClick={event => {
								clickOpenDropDawnInBigSearch(event, `whereSmall`)
							}}
						>
							<div
								className={`mt-3 mb-3 me-1 p-0 ${style.border} ${style.textWrap}`}
							>
								{t('Anywhere')}
							</div>
						</button>
					</Col>
					<Col
						className={`d-flex align-items-center justify-content-center p-0`}
					>
						<button
							onClick={event => {
								clickOpenDropDawnInBigSearch(event, `whenSmall`)
							}}
							className={`p-0 ${style.resetButton}`}
						>
							<div
								className={`mt-3 mb-3 me-1 pe-1 p-0 ${style.border} ${style.textWrap}`}
							>
								{t('AnyWeek')}
							</div>
						</button>
					</Col>
					<Col
						className={`d-flex align-items-center justify-content-center p-0`}
					>
						<button
							className={`p-0 ${style.resetButton}`}
							onClick={event => {
								clickOpenDropDawnInBigSearch(event, `whoSmall`)
							}}
						>
							<div className={`mt-3 mb-3 p-0 ${style.textWrap}`}>
								{t('AddedGuests')}
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
			) : (
				<div onClick={mobileEvent} className={style.Search_search}>
					<Image
						src={'/icon/search.svg'}
						width={30}
						height={30}
						alt='search icon'
					/>
				</div>
			)}
		</>
	)
}

export default SmallSearch
