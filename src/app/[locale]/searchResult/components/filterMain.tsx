'use server'
import React, { useMemo } from 'react'
import style from '@/app/[locale]/searchResult/searchResult.module.css'
import dynamic from 'next/dynamic'

import { GetServerSideProps } from 'next'
import store from '@/app/redux/store'
import searchDataService from '@/app/services/searchDataServices'
import { CardBiProps, DataSearchForSorting } from '@/app/type/type'
import convertData from '@/app/services/conwertDate'
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
