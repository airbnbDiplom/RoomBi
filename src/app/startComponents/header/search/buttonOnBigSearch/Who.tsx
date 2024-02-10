import { Col } from 'react-bootstrap'
import style from '../Search.module.css'
import { SearchDataState, ThemProps, WhoState } from '@/app/type/type'
import WhoDropDawn from './WhoDropDawn'
import { useEffect, useRef, useState } from 'react'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'

interface WhoProps {
	openDropDawn: (event: React.MouseEvent<HTMLButtonElement>) => void
	searchData: SearchDataState
	setSearchData: React.Dispatch<React.SetStateAction<SearchDataState>>
	isWhoDropOn?: boolean
	isTeamBlack: boolean
}

const Who: React.FC<WhoProps> = ({
	searchData,
	setSearchData,
	isWhoDropOn,
	openDropDawn,
	isTeamBlack,
}) => {
	const [gestString, SetGestString] = useState('Додайте гостей')
	const [isClearActive, setIsClearActive] = useState(false)
	const clearWhoInput = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		setSearchData(prevState => ({
			...prevState,
			whoObj: {
				...prevState.whoObj,
				gestsCount: 0,
			},
		}))
	}

	useEffect(() => {
		let str = `${
			searchData.whoObj.gestsCount + searchData.whoObj.childrenCount
		}`
		switch (str) {
			case '0':
				str = 'Додайте гостей'
				break
			case '1':
				str = `1 гість`
				break
			case '2':
			case '3':
				str = `${str} гостя`
				break
			default:
				str = `${str} гостів`
				break
		}
		if (searchData.whoObj.babyCount > 0) {
			str = `${str}, ${searchData.whoObj.babyCount} Немов. `
		}
		if (searchData.whoObj.animalsCount > 0) {
			str = `${str}, ${searchData.whoObj.animalsCount} Твары. `
		}
		setIsClearActive(str !== 'Додайте гостей' ? true : false)
		SetGestString(() => {
			return str
		})
	}, [
		searchData.whoObj.animalsCount,
		searchData.whoObj.babyCount,
		searchData.whoObj.childrenCount,
		searchData.whoObj.gestsCount,
	])
	return (
		<>
			<button
				id='who'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && isWhoDropOn ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !isWhoDropOn && style.btnBlackBac}`}
				onClick={event => openDropDawn(event)}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-xs-2 position-relative`}
					style={{ maxWidth: '170px', minWidth: '135px' }}
				>
					<p className={`${style.colorOne}  m-0`}>Хто</p>
					<p
						className={
							gestString === 'Додайте гостей'
								? `${style.colorTwo} text-truncate`
								: `${style.colorOne} m-0 text-truncate`
						}
						style={{ maxWidth: '95%' }}
					>
						{gestString}
					</p>
				</div>
				{isClearActive && <ClearInputBtn clearInput={clearWhoInput} />}
			</button>
			<WhoDropDawn
				whoArr={searchData.whoObj}
				setSearchData={setSearchData}
				isWhoDropOn={isWhoDropOn!}
			/>
		</>
	)
}

export default Who
