'use client'
import React, { useEffect, useState } from 'react'
import style from '../userApartments.module.css'
import { useSession } from 'next-auth/react'
import { decodeTokenAndGetUserDetails } from '@/app/services/jwtDecoder'
import Image from 'next/image'
type UserData = {
	id: string
	firstName: string
	lastName: string
	email: string
	address: string
	phoneNumber: string
	airbnbRegistrationYear: string
	profilePicture: string
	language: string
	country: string
	userStatus: string
	pf: string
} | null

const UserInfoText = () => {
	const session = useSession()
	const user = session?.data?.user?.name
	const [userDataS, setUserDataS] = useState<UserData | null>(null)
	let userData: UserData = null
	if (user && userDataS === null) {
		userData = decodeTokenAndGetUserDetails(user)
	}

	useEffect(() => {
		if (userData) {
			setUserDataS(userData)
		}
	}, [userData])

	return (
		<div className={style.userCard}>
			<div className={style.avatar}>
				{userDataS ? (
					userDataS?.profilePicture ? (
						<Image
							src={`https://roombi.space/Avatar/${userDataS.profilePicture}`}
							width={30}
							height={30}
							alt='avatar'
						/>
					) : (
						<div>{userDataS.firstName.substring(0, 1)}</div>
					)
				) : null}
			</div>
			<div className={style.userData}>
				<p>
					{userDataS?.firstName && userDataS?.firstName}
					&nbsp;
					{userData?.lastName && userData?.lastName}
				</p>
				<p>{userDataS?.email}</p>
				<p>{userDataS?.phoneNumber}</p>
			</div>
		</div>
	)
}

export default UserInfoText
