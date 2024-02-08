'use client'
import { Dropdown, Button, Modal, Form } from 'react-bootstrap'
import Image from 'next/image'
import style from './AuthenticationBtn.module.css'
import React, { useState } from 'react';


interface IAuthenticationBtn { }



const AuthenticationBtn: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

	const validatePassword = (password: string) => {
		return password.length >= 5;
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setIsPasswordValid(validatePassword(event.target.value));
	};

	const validateEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		setIsEmailValid(validateEmail(event.target.value));
	};

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
						onClick={handleShow}
						style={{ textDecoration: 'none', color: 'inherit', paddingLeft: '0' }}
					>
						Зареєструватися
					</Button>

					<Modal show={show} onHide={handleClose} centered
						animation>
						<Modal.Header closeButton>
							<Modal.Title>Увійдіть або зареєструйтеся</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<>
								<h2>Ласкаво просимо до RoomBi</h2>
								<Form>
									<Form.Group controlId="formBasicEmail">
										<Form.Control
											type="email"
											placeholder="Email"
											value={email}
											isInvalid={!isEmailValid}
											onChange={handleEmailChange}
										/>
										<Form.Control.Feedback type="invalid">
											Будь ласка, введіть дійсну електронну адресу.
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Control
											type="password"
											placeholder="Пароль"
											value={password}
											isInvalid={!isPasswordValid}
											onChange={handlePasswordChange}
										/>
										<Form.Control.Feedback type="invalid">
											Пароль повинен складатися принаймні з 5 символів.
										</Form.Control.Feedback>
									</Form.Group>
									<Button className="d-grid gap-2" variant="danger" type="submit" style={{ width: '100%', marginTop: '20px', marginBottom: '10px' }}>
										Продовжити
									</Button>
								</Form>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									<hr style={{ flex: 1 }} />
									<p style={{ margin: '0 10px' }}>або</p>
									<hr style={{ flex: 1 }} />
								</div>
								<Button
									variant="outline-dark"
									style={{
										justifyContent: 'center',
										width: '100%',
										marginTop: '10px',
										marginBottom: '10px'
									}}
									className="google-button"
								>
									<Image
										priority
										src='./icon/google.svg'
										width={18}
										height={18}
										alt='google icon'
									/>
									Продовжити через Google
								</Button>
							</>
						</Modal.Body>
					</Modal>

				</Dropdown.Item>
				<Dropdown.Item href='#'>Увійти</Dropdown.Item>
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
