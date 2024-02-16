import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useWindowSize = () => {
	const [size, setSize] = useState([window.innerWidth, window.innerHeight])
	useEffect(() => {
		const handleResize = () => setSize([window.innerWidth, window.innerHeight])
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return size
}
