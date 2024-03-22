'use client'
import React from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { CardBi } from '@/app/components/card/CardBi'
import { useTranslation } from 'react-i18next'
import LadingSpinner from './ladingSpinner'
import { setSearchFilterStateDefault } from '@/app/redux/searchInHeader/searchFilterSlice'

const SearchResult = () => {
	const { t } = useTranslation()
	const searchFilterData = useAppSelector(
		state => state.searchFilterReducer.collection
	)
	const dispatch = useAppDispatch()

	return (
		<>
			<div className={style.itemList}>
				{searchFilterData !== null ? (
					searchFilterData.length > 0 ? (
						searchFilterData.map(item => {
							return (
								<div className={style.item} key={item.id}>
									<CardBi {...item} />
								</div>
							)
						})
					) : (
						<>
							<h2 className={style.searchNiResult}>{t('searchNoResult')}</h2>
						</>
					)
				) : (
					<LadingSpinner />
				)}
			</div>
		</>
	)
}
export default SearchResult
