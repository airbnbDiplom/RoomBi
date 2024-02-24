import React, { useRef } from 'react'
import Image from 'next/image'
import style from '../Search.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import autoCompleteService from '@/app/services/autoCompleteService'
import { AutoCompleteList } from '@/app/type/type'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
	setWhereObj,
} from '@/app/redux/searchInHeader/SearchSlice'

interface props {
	inputRef: React.RefObject<HTMLInputElement>
}

const SearchBtn: React.FC<props> = ({ inputRef }) => {
	const dataSearch = useAppSelector(state => state.searchReducer.DataSearchObj)
	const dispatch = useAppDispatch()
	const validateData = () => {
		if (
			inputRef.current &&
			Object.keys(dataSearch.whereObj).length === 0 &&
			inputRef.current.value.trim().length > 2
		) {
			autoCompleteService(inputRef.current.value).then(
				(data: AutoCompleteList | null) => {
					if (data) {
						dispatch(setWhereObj(data.features[0]))
						console.log('data.features[0]', data.features[0])
					} else {
						console.log('Where handleInputChange No data fetched.')
					}
				}
			)
		}
		if (
			(dataSearch.whenObj.dateCome === '' &&
				dataSearch.whenObj.dateOut !== '') ||
			(dataSearch.whenObj.dateCome !== '' && dataSearch.whenObj.dateOut === '')
		) {
			if (dataSearch.whenObj.dateCome === '') {
				const date = new Date(dataSearch.whenObj.dateOut)
				dispatch(setWhenObjDateCome(dataSearch.whenObj.dateOut))
				dispatch(
					setWhenObjDateOut(
						new Date(date.setDate(date.getDate() + 1)).toString()
					)
				)
			} else {
				const date = new Date(dataSearch.whenObj.dateCome)
				dispatch(
					setWhenObjDateOut(
						new Date(date.setDate(date.getDate() + 1)).toString()
					)
				)
			}
		}
		console.log('dataSearch', dataSearch)
	}
	return (
		<div
			className={`${style.item} ${style.item_5}  ${style.cursor}  ${style.search}`}
			onClick={() => {
				validateData()
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
