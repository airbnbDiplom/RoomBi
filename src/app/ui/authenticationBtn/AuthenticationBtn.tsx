'use client'
import { ThemProps } from '@/app/type/type'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import intl from 'react-intl-universal'
import style from './AuthenticationBtn.module.css'
import ModalForm from './ModalForm'

const AuthenticationBtn: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const [showRegister, setShowRegister] = useState(false)
	const [showLogin, setShowLogin] = useState(false)

	const handleShowRegister = () => setShowRegister(true)
	const handleCloseRegister = () => setShowRegister(false)

	const handleShowLogin = () => setShowLogin(true)
	const handleCloseLogin = () => setShowLogin(false)

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

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
						onClick={handleShowRegister}
						style={{
							textDecoration: 'none',
							color: 'inherit',
							paddingLeft: '0',
						}}
					>
						{intl.get('createAccount')}
					</Button>
					<ModalForm
						show={showRegister}
						handleClose={handleCloseRegister}
						isRegistration={true}
					/>
				</Dropdown.Item>
				<Dropdown.Item href='#'>
					<Button
						variant='link'
						onClick={handleShowLogin}
						style={{
							textDecoration: 'none',
							color: 'inherit',
							paddingLeft: '0',
						}}
					>
						{intl.get('entertoaccount')}
					</Button>
					<ModalForm
						show={showLogin}
						handleClose={handleCloseLogin}
						isRegistration={false}
					/>
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item href='#'>{intl.get('offerroom')}</Dropdown.Item>
				<Dropdown.Item href='#'>{intl.get('helpcenter')}</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export { AuthenticationBtn }
