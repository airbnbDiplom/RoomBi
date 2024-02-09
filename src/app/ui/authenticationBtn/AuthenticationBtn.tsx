'use client'
import { Dropdown, Button, Modal, Form } from 'react-bootstrap'
import Image from 'next/image'
import style from './AuthenticationBtn.module.css'
import React, { useState } from 'react';
import ModalForm from './ModalForm';


interface IAuthenticationBtn { }



const AuthenticationBtn: React.FC = () => {
	
	const [showRegister, setShowRegister] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
  
	const handleShowRegister = () => setShowRegister(true);
	const handleCloseRegister = () => setShowRegister(false);
  
	const handleShowLogin = () => setShowLogin(true);
	const handleCloseLogin = () => setShowLogin(false);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Dropdown className='d-flex align-item-center'>
			<Dropdown.Toggle
				variant='none'
				id='dropdown-basic'
				style={{ border: 'none', paddingRight: '0', background: 'none' }}
				className={`custom-dropdown-toggle w-100 d-flex justify-content-end`}
			>
				<div className={`${style.btnWhite} m-0 `}>
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
				</div>
			</Dropdown.Toggle>
			<Dropdown.Menu className={style.itemFont}>
				      <Dropdown.Item href='#'>
        <Button
          variant="link"
          onClick={handleShowRegister}
          style={{ textDecoration: 'none', color: 'inherit', paddingLeft: '0' }}
        >
          Зареєструватися
        </Button>
        <ModalForm show={showRegister} handleClose={handleCloseRegister} isRegistration={true} />
      </Dropdown.Item>
      <Dropdown.Item href='#'>
        <Button
          variant="link"
          onClick={handleShowLogin}
          style={{ textDecoration: 'none', color: 'inherit', paddingLeft: '0' }}
        >
          Увійти
        </Button>
        <ModalForm show={showLogin} handleClose={handleCloseLogin} isRegistration={false} />
      </Dropdown.Item>
      <Dropdown.Divider />
				<Dropdown.Item href='#'>
					Запропонувати помешкання на RoomBi
				</Dropdown.Item>
				<Dropdown.Item href='#'>Центр допомоги</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}



export { AuthenticationBtn }
