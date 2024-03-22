import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import style from '../Search.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'

import {
	AutoCompleteItem,
	DataSearchForSorting,
	SearchBtnEnum,
} from '@/app/type/type'

import Link from 'next/link'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import autoCompleteService from '@/app/services/autoCompleteService'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
	setWhereObj,
	setWhoObjGestCount,
} from '@/app/redux/searchInHeader/SearchSlice'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import convertData from '@/app/services/conwertDate'
import searchDataService from '@/app/services/searchDataServices'
import { setSearchFilterState } from '@/app/redux/searchInHeader/searchFilterSlice'

interface props {
	inputRef: React.RefObject<HTMLInputElement>
}

const SearchBtn: React.FC<props> = ({ inputRef }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const dataSearch = useAppSelector(state => state.searchReducer.DataSearchObj)
	const { t } = useTranslation()
	const [transferData, setTransferData] = useState<DataSearchForSorting | null>(
		null
	)
	const initTransferData = useCallback(() => {
		setTransferData({
			where:
				Object.keys(dataSearch.whereObj).length > 0
					? {
							type: dataSearch.whereObj.addresstype,
							countryCode: dataSearch.whereObj.address.country_code,
							placeId: dataSearch.whereObj.place_id,
					  }
					: undefined,
			when: {
				start: convertData(new Date(dataSearch.whenObj.dateCome)),
				end: convertData(new Date(dataSearch.whenObj.dateOut)),
			},
			why:
				dataSearch.whyObj.gestsCount === 1
					? 1
					: dataSearch.whyObj.gestsCount +
					  dataSearch.whyObj.childrenCount +
					  dataSearch.whyObj.babyCount,
		})
	}, [
		dataSearch.whenObj.dateCome,
		dataSearch.whenObj.dateOut,
		dataSearch.whereObj,
		dataSearch.whyObj.babyCount,
		dataSearch.whyObj.childrenCount,
		dataSearch.whyObj.gestsCount,
	])

	useEffect(() => {
		initTransferData()
	}, [dataSearch, initTransferData])

	const fetchData = async () => {
		if (transferData === null) {
			console.log('transferData is null')
			return
		}
		searchDataService(transferData).then(list => {
			dispatch(setSearchFilterState(list))
		})
	}

	// useEffect(() => {
	// 	if (transferData !== null) fetchData()
	// }, [fetchData, transferData])

	const validDataCheck: React.MouseEventHandler<HTMLDivElement> = () => {
		const searchDirection = inputRef.current?.value
		if (searchDirection) {
			// В случае если через автокомплит не чего не выбрано выбрать по первому вхождению
			if (
				searchDirection.trim().length > 2 &&
				Object.keys(dataSearch.whereObj).length === 0
			) {
				autoCompleteService(searchDirection.trim(), t('locale')).then(
					(data: AutoCompleteItem[] | null) => {
						if (data) {
							for (let i = 0; i < data.length; i++) {
								if (
									data[i].addresstype === 'country' ||
									data[i].addresstype === 'city' ||
									data[i].addresstype === 'region'
								) {
									dispatch(setWhereObj(data[i]))

									console.log('data', data)
									break
								}
							}
						} else {
							console.log('Where handleInputChange No data fetched.')
						}
					}
				)
			}
			// проверка дат на пустоту( пустой даты быть не должно)
			let newDate: string = ''
			if (
				dataSearch.whenObj.dateCome === '' &&
				dataSearch.whenObj.dateOut !== ''
			) {
				const date = new Date(dataSearch.whenObj.dateOut)
				newDate = new Date(date.setDate(date.getDate() + 1)).toString()
				dispatch(setWhenObjDateCome(dataSearch.whenObj.dateOut))
				dispatch(setWhenObjDateOut(newDate))
			}
			if (
				dataSearch.whenObj.dateCome !== '' &&
				dataSearch.whenObj.dateOut === ''
			) {
				const date = new Date(dataSearch.whenObj.dateCome)
				dispatch(
					setWhenObjDateOut(
						new Date(date.setDate(date.getDate() + 1)).toString()
					)
				)
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
		}
		// проверка количества гостей
		if (dataSearch.whyObj.gestsCount === 0) {
			dispatch(setWhoObjGestCount(1))
		}
	}

	const createDateForeTransfer: React.MouseEventHandler<
		HTMLDivElement
	> = () => {
		//собираем объект для отправки на сервер
		initTransferData()
	}

	return (
		<div
			onClick={e => {
				validDataCheck(e)
				createDateForeTransfer(e)
				fetchData()
				router.push('/searchResult')
			}}
			className={`${style.search} ${style.item_5} ${style.item}  ${style.link}`}
		>
			<div
				className={`${style.search}  `}
				onClick={() => {
					dispatch(setBtnState(SearchBtnEnum.DisableAll))
				}}
			>
				<Image
					src={'/icon/search.svg'}
					width={30}
					height={30}
					alt='search icon'
				/>
			</div>
		</div>
	)
}

export default SearchBtn
