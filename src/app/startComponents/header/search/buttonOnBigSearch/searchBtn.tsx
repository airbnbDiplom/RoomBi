import React, { useRef } from 'react'
import Image from 'next/image'
import style from '../Search.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import autoCompleteService from '@/app/services/autoCompleteService'
import {
	AutoCompleteItem,
	AutoCompleteList,
	DataSearchForSorting,
	DateBi,
	DateBooking,
} from '@/app/type/type'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
	setWhereObj,
} from '@/app/redux/searchInHeader/SearchSlice'
import searchDataService from '@/app/services/searchDataServices'
import { useTranslation } from 'react-i18next'
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
			(dataSearch.whenObj.dateCome === '' &&
				dataSearch.whenObj.dateOut !== '') ||
			(dataSearch.whenObj.dateCome !== '' && dataSearch.whenObj.dateOut === '')
		) {
			if (dataSearch.whenObj.dateCome === '') {
				const date = new Date(dataSearch.whenObj.dateOut)
				newDate = new Date(date.setDate(date.getDate() + 1)).toString()
				dispatch(setWhenObjDateCome(dataSearch.whenObj.dateOut))
				dispatch(setWhenObjDateOut(newDate.toString()))
			} else {
				const date = new Date(dataSearch.whenObj.dateCome)
				newDate = new Date(date.setDate(date.getDate() + 1)).toString()
				dispatch(setWhenObjDateOut(newDate.toString()))
			}
		}
		console.log('dataSearch', dataSearch)

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
			.then((data: any) => {
				//if (data !== null)
				//{
				console.log('data', data)
				sessionStorage.setItem('dataSearch', JSON.stringify(dataSearch))
				//	window.location.replace('/searchResult')
				// } else {
				// 	console.log('dateIsNull')
				// }
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
		<div
			className={`${style.item} ${style.item_5}  ${style.cursor}  ${style.search}`}
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
	)
}

export default SearchBtn
