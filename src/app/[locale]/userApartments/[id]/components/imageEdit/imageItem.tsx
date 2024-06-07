'use client'
import Image from 'next/image'
import style from '../../edit.module.css'
import { useState } from 'react'
import ImageModal from './imageModal'
interface IimageItem {
	index: number
	pictureUrl: string
	fileURL: string
	localResource: boolean
}
const ImageItem: React.FC<IimageItem> = ({
	index,
	pictureUrl,
	fileURL,
	localResource,
}) => {
	const [show, setShow] = useState(false)
	const openHandler = () => {
		setShow(true)
	}
	return (
		<>
			<div className={style.imageItem} onClick={openHandler}>
				<Image
					className={`${style.itemGrid} ${style['itemGrid' + index]}`}
					key={index}
					src={fileURL + pictureUrl}
					alt='p'
					width={300}
					height={300}
				/>
			</div>
			<ImageModal
				localResource={localResource}
				setShow={setShow}
				show={show}
				index={index}
				pictureUrl={fileURL + pictureUrl}
			/>
		</>
	)
}

export default ImageItem
