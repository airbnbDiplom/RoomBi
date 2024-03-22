'use client'
import React, { useEffect, useState } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import { useAppSelector } from '@/app/redux/hook'
import { CardBi } from '@/app/components/card/CardBi'
import { CardBiProps, DataSearchForSorting } from '@/app/type/type'

import { useTranslation } from 'react-i18next'

import convertData from '@/app/services/conwertDate'
import searchDataService from '@/app/services/searchDataServices'
import LadingSpinner from './ladingSpinner'

const SearchResult = () => {
	const { t } = useTranslation()
	const searchFilterData = useAppSelector(
		state => state.searchFilterReducer.collection
	)
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
						<h2 className={style.searchNiResult}>{t('searchNoResult')}</h2>
					)
				) : (
					<LadingSpinner />
				)}
			</div>
		</>
	)
}
export default SearchResult
