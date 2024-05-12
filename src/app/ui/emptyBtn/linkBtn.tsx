'use client'
import style from './linkBtnStyle.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FinishBtn from '@/app/[locale]/becomeAHost/components/finishBtn'
interface BtnProps {
	BgColor: string
	btnDirection: boolean
	pathArr: string[]
	textColor: string
}
type BtnWithValidationProps = BtnProps
const LinkBtn: React.FC<BtnWithValidationProps> = ({
	BgColor,
	btnDirection,
	textColor,
	pathArr,
}) => {
	const path = usePathname()

	const [currentPath, setCurrentPath] = useState('')
	const [href, setHref] = useState('/')
	const [text, setText] = useState('')
	const [arrPathIndex, setArrPathIndex] = useState(0)

	useEffect(() => {
		setCurrentPath(path.substring(path.lastIndexOf('/')))
	}, [path])

	useEffect(() => {
		setArrPathIndex(pathArr.indexOf(currentPath))
	}, [btnDirection, currentPath, pathArr])

	useEffect(() => {
		if (arrPathIndex === -1) return

		if ((arrPathIndex === 0 || arrPathIndex === 1) && !btnDirection) {
			setText('exit')
			setHref('/')
			return
		}
		if (arrPathIndex === 0 && btnDirection) {
			setText('start')
			setHref('/becomeAHost' + pathArr[arrPathIndex + 1])
			return
		}

		if (arrPathIndex === pathArr.length - 1 && btnDirection) {
			setText('finish')
			//	setHref('/')

			return
		}
		if (!btnDirection) {
			setText('back')
			setHref('/becomeAHost' + pathArr[arrPathIndex - 1])
		}
		if (btnDirection) {
			setText('next')
			setHref('/becomeAHost' + pathArr[arrPathIndex + 1])
		}
	}, [arrPathIndex, btnDirection, pathArr, text])

	const { t } = useTranslation()
	return text !== 'finish' ? (
		<Link
			href={href || '/'}
			style={{ background: BgColor, color: textColor }}
			className={style.btnStyle}
		>
			{t(text)}
		</Link>
	) : (
		<FinishBtn />
	)
}

export default LinkBtn
