import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useWindowSize = () => {
	const [size, setSize] = useState(() => {
		if (typeof window !== 'undefined') {
			return [window.innerWidth, window.innerHeight]
		} else {
			return [0, 0]
		}
	})
	useEffect(() => {
		const handleResize = () =>
			setSize([window?.innerWidth, window?.innerHeight])

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize)
		}

		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return size
}
