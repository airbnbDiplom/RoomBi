'use client'
import { ThemProps } from '@/app/type/type'
import Image from 'next/image'
import { Dropdown, Button } from 'react-bootstrap'
import style from './AuthenticationBtn.module.css'
import React, { useState } from 'react'
import ModalForm from './ModalForm'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react';
import { signIn, signOut } from "next-auth/react";
import { decodeTokenAndGetFirstLetterOfName } from '@/app/services/jwtDecoder';
const AuthenticationBtn: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const [showRegister, setShowRegister] = useState(false)
	const [showLogin, setShowLogin] = useState(false)
	const { t } = useTranslation()
	const { data: session } = useSession();
	const user = session?.user?.name || null;
	const token = session?.user?.name;
	const firstLetterOfName = token ? decodeTokenAndGetFirstLetterOfName(token) : '';
	return (
		<Dropdown className={`d-flex align-item-center ${style.btn}`}>
			<Dropdown.Toggle
				variant='none'
				id='dropdown-basic'
				style={{ border: 'none', paddingRight: '0', background: 'none' }}
				className={`custom-dropdown-toggle w-100 d-flex justify-content-end`}
			>
				<div
					className={`${style.btn} ${isTeamBlack ? style.btnBlack : style.btnWhite
						} m-0 `}
				>
					<Image
						priority
						src={isTeamBlack ? '/icon/burgerW.svg' : '/icon/burger.svg'}
						width={22}
						height={22}
						alt='List icon'
					/>
					{user ? (
						<div style={{
							width: '22px',
							height: '22px',
							borderRadius: '50%',
							backgroundColor: '#696969',
							color: '#ffffff',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							{firstLetterOfName}
						</div>
					) : (
						<Image
							priority
							src={isTeamBlack ? "./icon/personW.svg" : "./icon/person.svg"}
							width={22}
							height={22}
							alt="person icon"
						/>
					)}
				</div>
			</Dropdown.Toggle>
			{user ? (
				<Dropdown.Menu className={style.itemFont}>
					<Dropdown.Divider />
					<Dropdown.Item href="#">{t("helpcenter")}</Dropdown.Item>
					<Dropdown.Item href="#">
						<button onClick={() => signOut()}>signOut </button>
					</Dropdown.Item>
				</Dropdown.Menu>
			) : (
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
							handleOpen={() => setShowRegister(true)}
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
							handleOpen={() => setShowRegister(true)}
							isRegistration={false}
						/>
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href='#'>{t('offerroom')}</Dropdown.Item>
					<Dropdown.Item href='#'>{t('helpcenter')}</Dropdown.Item>
				</Dropdown.Menu>
			)}
		</Dropdown>
	)
}

export { AuthenticationBtn }
