'use client'

import React, { useEffect } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import { useAppSelector } from '@/app/redux/hook'
const SearchResultItemList: React.FC = () => {
	const apartmentList = useAppSelector(
		state => state.apartmentsReducer.apartmentsAll
	)

	return (
		<div className={style.itemList}>
			apartment
			{/* {apartmentList.map(item => {
				return <div key={item.id}>{item.id}</div>
			})} */}
		</div>
	)
}

export default SearchResultItemList
