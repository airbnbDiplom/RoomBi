import { Modal, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './AuthenticationBtn.module.css';
import intl from 'react-intl-universal';

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  isRegistration: boolean;
}

const ModalForm: React.FC<ModalFormProps> = ({ show, handleClose, isRegistration }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(true);

  const validatePassword = (password: string) => {
    return password.length >= 5;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordValid(validatePassword(event.target.value));
  };

  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
    setIsRepeatPasswordValid(event.target.value === password);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailValid(validateEmail(event.target.value));
  };

  return (
   
    <Modal show={show} onHide={handleClose} centered
    animation>
    <Modal.Header closeButton>
      <Modal.Title className={styles.modalTitle}>{intl.get('enterOrRegister')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <>
        <h2 className={styles.welcomeMessage}>{intl.get('welcomeMessage')}</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className={styles.formControl}
              type="email"
              placeholder={intl.get('email')}
              value={email}
              isInvalid={!isEmailValid}
              onChange={handleEmailChange}
            />
            <Form.Control.Feedback type="invalid">
              {intl.get('enterValidEmail')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder={intl.get('password')}
              value={password}
              isInvalid={!isPasswordValid}
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid">
              {intl.get('passwordMustBeAtLeast5')}
            </Form.Control.Feedback>
          </Form.Group>
          {isRegistration && (
  <Form.Group controlId="formBasicRepeatPassword">
    <Form.Control
      type="password"
      placeholder={intl.get('confirmPassword')}
      value={repeatPassword}
      isInvalid={!isRepeatPasswordValid}
      onChange={handleRepeatPasswordChange}
    />
    <Form.Control.Feedback type="invalid">
      {intl.get('passwordsDoNotMatch')}
    </Form.Control.Feedback>
  </Form.Group>
)}
          <Button className={`d-grid gap-2 ${styles.submitButton}`} variant="danger" type="submit" >
          {intl.get('continue')}
          </Button>
        </Form>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <hr style={{ flex: 1 }} />
          <p style={{ margin: '0 10px' }}>{intl.get('or')}</p>
          <hr style={{ flex: 1 }} />
        </div>
        <Button
          variant="outline-dark"
          className={`google-button ${styles.googleButton}`}
        >
          <Image
            priority
            src='./icon/google.svg'
            width={18}
            height={18}
            alt='google icon'
          />
          {intl.get('continueWithGoogle')}
        </Button>
      </>
    </Modal.Body>
  </Modal>
  );
};

export default ModalForm;