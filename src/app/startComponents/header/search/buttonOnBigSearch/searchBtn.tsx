import React from 'react'
import Image from 'next/image'
import style from '../Search.module.css'

const SearchBtn = () => {
	return (
		<div
			className={`${style.item} ${style.item_5}  ${style.cursor}  ${style.search}`}
		>
			<Image
				src={'/icon/search.svg'}
				width={30}
				height={30}
				alt='search icon'
			/>
		</div>
	)
}

export default SearchBtn
