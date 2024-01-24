'use client'
import Image from 'next/image'
import style from './showMapBtn.module.css'

const ShowMapBtn: React.FC = () => {
	return (
		<button className={style.btnStyle}>
			<p className={style.p}>Показати мапу</p>
			<Image
				priority
				src='./icon/map.svg'
				width={20}
				height={20}
				alt='List icon'
			/>
		</button>
	)
}

export { ShowMapBtn }
