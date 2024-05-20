import React from 'react'
import style from '../userApartments.module.css'
import UserInfoText from './userInfoText'
const UserInfo = () => {
	return (
		<div className={style.userInfoContainer}>
			<UserInfoText />
		</div>
	)
}

export default UserInfo
