'use client'
import React from 'react'
import style from '@/app/[locale]/searchResult/components/searchResult.module.css'
import SearchResultList from './searchResultList'
import MapForSearch from './mapForSearch'

const FilterMain = () => {
	return (
		<main className={style.main}>
			<SearchResultList />
			<MapForSearch />
		</main>
	)
}

export default FilterMain
