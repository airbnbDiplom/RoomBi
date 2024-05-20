import React from 'react'
import Image from 'next/image'
import style from '../userApartments.module.css'
const Loading = () => {
	return (
		<Image
			className={style.loading}
			src={'/spinners/Ellipsis@1x-1.0s-200px-200px (1).svg'}
			width={50}
			height={50}
			alt='loading'
		/>
	)
}

export default Loading
