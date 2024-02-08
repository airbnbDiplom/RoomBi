import { Modal, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import React, { useState } from 'react';

const ModalForm: React.FC = () => {
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
  );
};

export default ModalForm;