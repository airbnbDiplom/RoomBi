'use server'
import React, { useMemo } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import dynamic from 'next/dynamic'
import SearchResult from './searchResult'

const FilterMain = () => {
	const MapForSearch = useMemo(
		() =>
			dynamic(
				() =>
					import('@/app/[locale]/searchResult/components/mapForSearch').then(
						mod => mod.default
					),
				{
					// loading: () => <Loading />,
					ssr: false,
				}
			),
		[]
	)
	return (
		<main className={style.main}>
			<SearchResult />
			<MapForSearch />
		</main>
	)
}

export default FilterMain
