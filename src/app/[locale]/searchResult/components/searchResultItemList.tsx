'use client'
import React, { useEffect } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { CardBi } from '@/app/components/card/CardBi'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import { SearchBtnEnum } from '@/app/type/type'
import { setSearchInitial } from '@/app/redux/searchInHeader/SearchSlice'
const SearchResultItemList: React.FC = () => {
	const searchFilterList = useAppSelector(
		state => state.searchFilterReducer.collection
	)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(setBtnState(SearchBtnEnum.DisableAll))
	}, [])
	return (
		<div className={style.itemList}>
			{searchFilterList.map(item => {
				return (
					<div className={style.item} key={item.id}>
						<CardBi {...item} />
					</div>
				)
			})}
		</div>
	)
}

export default SearchResultItemList
