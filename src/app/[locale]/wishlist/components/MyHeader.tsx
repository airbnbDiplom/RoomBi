'use client'
import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import style from '@/app/startComponents/header/Header.module.css'

import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import { SearchBtnEnum } from '@/app/type/type'
import { useTranslation } from 'react-i18next'
import { setState } from '@/app/redux/searchInHeader/SearchSlice'


const MyHeader: FC = () => {
	const { t } = useTranslation()
	const [isTeamBlack, setTeamBlack] = useState(false)
	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	useEffect(() => {
		setTeamBlack(btnState === SearchBtnEnum.DisableAll ? false : true)
	}, [btnState])
	useEffect(() => {
		const data = sessionStorage.getItem('dataSearch')
		if (data !== null) {
			const dataParse = JSON.parse(data)
			console.log('dataParse', dataParse)
			dispatch(setState(dataParse))
			sessionStorage.removeItem('dataSearch')
		}})
	
	return (
		<div
			className={` pt-xs-1 pt-sm-2 pt-md-4  pb-3   ps-md-3 pe-md-3 ps-lg-3 pe-lg-3 pe-xl-4 ps-xl-4' ${
				style.header} ${isTeamBlack ? style.headerBlaCk : style.headerWhite} `}>
			<div className={style.LogoContainer}>
				<Link href={'/'} className={`${isTeamBlack && style.logoBlack} ${style.logo}`}>
					RoomBi
				</Link>
			</div>
			<div className={style.authBtn}></div>
			<div className={style.authBtn}></div>
			<div className={style.authBtn}>
				<AuthenticationBtn isTeamBlack={isTeamBlack} />
			</div>
		</div>
	)
}
export { MyHeader}
