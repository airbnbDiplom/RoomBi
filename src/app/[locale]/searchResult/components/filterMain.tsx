'use client'
import React from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import SearchResult from './searchResult'
import MapForSearch from './mapForSearch'

const FilterMain = () => {
	return (
		<main className={style.main}>
			<SearchResult />
			<MapForSearch />
		</main>
	)
}

export default FilterMain
