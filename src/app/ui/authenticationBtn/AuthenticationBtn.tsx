'use client'
import { ThemProps } from '@/app/type/type'
import Image from 'next/image'
import { Dropdown, Button } from 'react-bootstrap'
import style from './AuthenticationBtn.module.css'
import React, { useState } from 'react'
import ModalForm from './ModalForm'
import intl from 'react-intl-universal'
import { useTranslation } from 'react-i18next'
// import "@/app/configs/i18next";
const AuthenticationBtn: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const [showRegister, setShowRegister] = useState(false)
	const [showLogin, setShowLogin] = useState(false)
	const { t } = useTranslation()
	return (
		<Dropdown className={`d-flex align-item-center ${style.btn}`}>
			<Dropdown.Toggle
				variant='none'
				id='dropdown-basic'
				style={{ border: 'none', paddingRight: '0', background: 'none' }}
				className={`custom-dropdown-toggle w-100 d-flex justify-content-end`}
			>
				<div
					className={`${style.btn} ${
						isTeamBlack ? style.btnBlack : style.btnWhite
					} m-0 `}
				>
					<Image
						priority
						src={isTeamBlack ? './icon/burgerW.svg' : './icon/burger.svg'}
						width={22}
						height={22}
						alt='List icon'
					/>
					<Image
						priority
						src={isTeamBlack ? './icon/personW.svg' : './icon/person.svg'}
						width={22}
						height={22}
						alt='person icon'
					/>
				</div>
			</Dropdown.Toggle>
			<Dropdown.Menu className={style.itemFont}>
				<Dropdown.Item href='#'>
					<Button
						variant='link'
						onClick={() => setShowRegister(true)}
						style={{
							textDecoration: 'none',
							color: 'inherit',
							paddingLeft: '0',
						}}
					>
						{t('createAccount')}
					</Button>
					<ModalForm
						show={showRegister}
						handleClose={() => setShowRegister(false)}
						isRegistration={true}
					/>
				</Dropdown.Item>
				<Dropdown.Item href='#'>
					<Button
						variant='link'
						onClick={() => setShowLogin(true)}
						style={{
							textDecoration: 'none',
							color: 'inherit',
							paddingLeft: '0',
						}}
					>
						{t('entertoaccount')}
					</Button>
					<ModalForm
						show={showLogin}
						handleClose={() => setShowLogin(false)}
						isRegistration={false}
					/>
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item href='#'>{t('offerroom')}</Dropdown.Item>
				<Dropdown.Item href='#'>{t('helpcenter')}</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export { AuthenticationBtn }
