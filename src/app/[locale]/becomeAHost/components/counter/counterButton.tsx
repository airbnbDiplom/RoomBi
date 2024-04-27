import React from 'react'
import style from './counter.module.css'
import Image from 'next/image'
interface buttonProps {
	onClick: () => void
	imgPath: string
	disable: boolean
}

const CounterButton: React.FC<buttonProps> = ({
	onClick,
	imgPath,
	disable,
}) => {
	return (
		<button
			disabled={disable}
			className={`${style.resetButton} ${style.counterBtn}`}
			onClick={onClick}
		>
			<span className={style.imgContainer}>
				<Image src={imgPath} alt='minus' width={12} height={12} />
			</span>
		</button>
	)
}

export default CounterButton
