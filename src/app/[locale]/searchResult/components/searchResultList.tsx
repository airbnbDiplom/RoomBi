// 'use server'
// import { CardBi } from '@/app/components/card/CardBi'
// import searchDataService from '@/app/services/searchDataServices'

// import React from 'react'
// import style from '@/app/[locale]/searchResult/searchResult.module.css'
// // import { useTranslation } from 'react-i18next'
// import LadingSpinner from './ladingSpinner'

// const SearchResultList = async () => {
// 	const searchFilterList = await searchDataService(transferData)

// 	return (
// 		<>
// 			{searchFilterList !== null ? (
// 				searchFilterList.length > 0 ? (
// 					searchFilterList.map(item => {
// 						return (
// 							<div className={style.item} key={item.id}>
// 								<CardBi {...item} />
// 							</div>
// 						)
// 					})
// 				) : (
// 					<h2 className={style.searchNiResult}>sdsd</h2>
// 				)
// 			) : (
// 				<LadingSpinner />
// 			)}
// 		</>
// 	)
// }

// export default SearchResultList
