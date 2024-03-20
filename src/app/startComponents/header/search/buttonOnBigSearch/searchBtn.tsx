import React, { useRef } from 'react'
import Image from 'next/image'
import style from '../Search.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import autoCompleteService from '@/app/services/autoCompleteService'
import {
	AutoCompleteItem,
	AutoCompleteList,
	CardBiProps,
	DataSearchForSorting,
	DateBi,
	DateBooking,
	SearchBtnEnum,
} from '@/app/type/type'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
	setWhereObj,
} from '@/app/redux/searchInHeader/SearchSlice'
import searchDataService from '@/app/services/searchDataServices'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { setSearchFilterState } from '@/app/redux/searchInHeader/searchFilterSlice'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
interface props {
	inputRef: React.RefObject<HTMLInputElement>
}

const SearchBtn: React.FC<props> = ({ inputRef }) => {
	const { t } = useTranslation()

	const dataSearch = useAppSelector(state => state.searchReducer.DataSearchObj)
	const dispatch = useAppDispatch()
	const validData = () => {
		if (
			inputRef.current &&
			Object.keys(dataSearch.whereObj).length === 0 &&
			inputRef.current.value.trim().length > 2
		) {
			autoCompleteService(inputRef.current.value, t('locale')).then(
				(data: AutoCompleteItem[] | null) => {
					if (data) {
						dispatch(setWhereObj(data[0]))
					} else {
						console.log('Where handleInputChange No data fetched.')
					}
				}
			)
		}
		let newDate: string = ''
		if (
			dataSearch.whenObj.dateCome === '' &&
			dataSearch.whenObj.dateOut !== ''
		) {
			const date = new Date(dataSearch.whenObj.dateOut)
			newDate = new Date(date.setDate(date.getDate() + 1)).toString()
			dispatch(setWhenObjDateCome(dataSearch.whenObj.dateOut))
			dispatch(setWhenObjDateOut(newDate.toString()))
		}
		if (
			dataSearch.whenObj.dateCome !== '' &&
			dataSearch.whenObj.dateOut === ''
		) {
			const date = new Date(dataSearch.whenObj.dateCome)
			newDate = new Date(date.setDate(date.getDate() + 1)).toString()
			dispatch(setWhenObjDateOut(newDate.toString()))
		}
		if (
			dataSearch.whenObj.dateCome === '' &&
			dataSearch.whenObj.dateOut === ''
		) {
			const toDay = new Date()
			dispatch(setWhenObjDateCome(toDay.toString()))
			dispatch(
				setWhenObjDateOut(
					new Date(toDay.setDate(toDay.getDate() + 1)).toString()
				)
			)
		}

		const transferData: DataSearchForSorting = {
			where:
				Object.keys(dataSearch.whereObj).length > 0
					? {
							type: dataSearch.whereObj.addresstype,
							countryCode: dataSearch.whereObj.address.country_code,
							placeId: dataSearch.whereObj.place_id,
					  }
					: undefined,
			when:
				dataSearch.whenObj.dateCome !== '' || dataSearch.whenObj.dateOut !== ''
					? {
							start:
								dataSearch.whenObj.dateCome === ''
									? convertData(new Date(newDate))
									: convertData(new Date(dataSearch.whenObj.dateCome)),
							end:
								dataSearch.whenObj.dateOut === ''
									? convertData(new Date(newDate))
									: convertData(new Date(dataSearch.whenObj.dateOut)),
					  }
					: undefined,
			why:
				dataSearch.whyObj.gestsCount > 0
					? dataSearch.whyObj.gestsCount +
					  dataSearch.whyObj.childrenCount +
					  dataSearch.whyObj.babyCount
					: undefined,
		}
		console.log('transferData', transferData)
		searchDataService(transferData)
			.then((data: CardBiProps[]) => {
				if (data !== null) {
					console.log('data', data)
					dispatch(setSearchFilterState(data))
				} else {
					console.log('data null')
				}
			})
			.catch(err => {
				console.log('err', err)
			})
	}
	const convertData = (date: Date): DateBi => {
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate(),
		}
	}

	return (
		<Link
			href={'/searchResult'}
			className={`${style.search} ${style.item_5} ${style.item}  ${style.link}`}
		>
			<div
				className={`${style.search}  `}
				onClick={() => {
					validData()
				}}
			>
				<Image
					src={'/icon/search.svg'}
					width={30}
					height={30}
					alt='search icon'
				/>
			</div>
		</Link>
	)
}

export default SearchBtn
