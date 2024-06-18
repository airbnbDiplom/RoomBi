'use client'

import { SearchKindSwitch } from '@/app/type/type'
import { useEffect, useState } from 'react'
interface props {
	isBigSearchOn: boolean
	isSmallSearchOn: boolean
}
debugger
const SmallSearchMobile: React.FC<SearchKindSwitch & props> = ({
	isSmallSearchOn,
	isBigSearchOn,
	setSmallSearchOn,
	setBigSearchOn,
	setBigSearchOnBySmall,
}) => {
	const [scroll, setScroll] = useState(0)
	const handleScroll = () => {
		const currentScroll = window.scrollY
		setScroll(currentScroll)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (isSmallSearchOn && scroll === 0) {
			window.removeEventListener('scroll', handleScroll)
			setSmallSearchOn(false)
			setBigSearchOn(true)
			setBigSearchOnBySmall(true)
		}
	}, [
		isBigSearchOn,
		isSmallSearchOn,
		scroll,
		setBigSearchOn,
		setBigSearchOnBySmall,
		setSmallSearchOn,
	])
	console.log(scroll)
	return <div>smallSearchMobile</div>
}

export default SmallSearchMobile
