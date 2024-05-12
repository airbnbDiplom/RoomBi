import React from 'react'
import style from './previewComponent.module.css'
import { useSession } from 'next-auth/react'
import { decodeTokenAndGetUserDetails } from '@/app/services/jwtDecoder'
import Image from 'next/image'
import { useAppDispatch } from '@/app/redux/hook'
import { serMasterId } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
type userDit = {
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
const UserInfo = () => {
	const { data: session } = useSession()
	const dispatch = useAppDispatch()
	const user = session?.user?.name
	let userDit: userDit = null

	if (user) {
		userDit = decodeTokenAndGetUserDetails(user)
		if (userDit) dispatch(serMasterId(userDit.id))
	}

	return (
		<div className={style.userBlock}>
			<div className={style.avatar}>
				{userDit ? (
					userDit?.profilePicture ? (
						<Image
							src={`https://roombi.space/Avatar/${userDit.profilePicture}`}
							width={30}
							height={30}
							alt='avatar'
						/>
					) : (
						<div>{userDit.firstName.substring(0, 1)}</div>
					)
				) : null}
			</div>
			<div className={style.userData}>
				<p>
					{userDit ? userDit?.firstName + ' ' + userDit?.lastName : 'Guest'}
				</p>
				<p>{userDit ? userDit?.email : 'Guest'}</p>
				<p>{userDit ? userDit?.phoneNumber : 'Guest'}</p>
			</div>
		</div>
	)
}

export default UserInfo
