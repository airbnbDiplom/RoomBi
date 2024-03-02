import React, { useMemo } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import SearchResultItemList from './searchResultItemList'
import MapForSearch from './mapForSearch'
import dynamic from 'next/dynamic'
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
			<SearchResultItemList />
			<MapForSearch />
		</main>
	)
}

export default FilterMain
