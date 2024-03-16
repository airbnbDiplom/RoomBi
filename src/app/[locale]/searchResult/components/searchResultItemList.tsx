'use client'

import React, { useEffect } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import { useAppSelector } from '@/app/redux/hook'
import { CardBi } from '@/app/components/card/CardBi'
const SearchResultItemList: React.FC = () => {
	const searchFilterList = useAppSelector(
		state => state.searchFilterReducer.collection
	)

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
