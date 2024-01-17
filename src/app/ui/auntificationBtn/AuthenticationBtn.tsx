'use client'
import Image from 'next/image'
import style from './AuthenticationBtn.module.css'

interface IAuthenticationBtn {}

const AuthenticationBtn: React.FC = () => {
	return (
		<button className={`${style.btnWhite}`}>
			<Image
				priority
				src='./icon/burger.svg'
				width={22}
				height={22}
				alt='List icon'
			/>
			<Image
				priority
				src='./icon/person.svg'
				width={22}
				height={22}
				alt='person icon'
			/>
		</button>
	)
}

export { AuthenticationBtn }
