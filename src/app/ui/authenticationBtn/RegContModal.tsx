import React, { useRef, useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AuthenticationBtn.module.css";
import { ChevronLeft } from 'react-bootstrap-icons';
import { Calendar } from 'react-bootstrap-icons';
import MaskedInput from 'react-text-mask';
import { isValid, parse } from 'date-fns';
import { useTranslation } from "next-i18next";
import { signIn, signOut } from "next-auth/react";
import { uk } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';

interface Country {
  name: string;
  countryCode: string;
}

interface RegContModalProps {
  show: boolean;
  onHide: () => void;
  openModalForm: () => void;
  email: string;
  password: string;
  countries: Country[]; 
}

interface RequestUser {
  email?: string;
  password?: string;
  type?: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  country?: string;
}
const RegContModal: React.FC<RegContModalProps> = ({ show, onHide, openModalForm, email, password, countries }) => {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState('+380');
  const [phone, setPhone] = useState(countryCode);
  const [date, setDate] = useState(new Date('2000 11 11'));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState("");
const [lastNameError, setLastNameError] = useState("");
const [phoneError, setPhoneError] = useState("");
  const currentLanguage = i18n.language;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const user: RequestUser = {
      email: email,
      password: password,
      type: "register2",
      name: `${firstName} ${lastName}`,
      phoneNumber: phone,
      dateOfBirth: date.toISOString(),
      country: "Україна"
    };
  
    const validateName = (name: string) => {
      const re = /^[a-zA-Z ]{2,30}$/;
      return re.test(name);
    };
    
    const validatePhone = (phone: string) => {
      const re = /^\+\d{1,4}\d{10}$/;
      return re.test(phone);
    };
    
    // Call these functions when the fields change
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFirstName(value);
      if (!validateName(value)) {
        setFirstNameError(t('invalidFirstName'));
      } else {
        setFirstNameError("");
      }
    };
    
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLastName(value);
      if (!validateName(value)) {
        setLastNameError(t('invalidLastName'));
      } else {
        setLastNameError("");
      }
    };
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.startsWith(countryCode)) {
        const numericValue = value.slice(countryCode.length).replace(/\D/g, '');
        setPhone(countryCode + numericValue);
        if (!validatePhone(countryCode + numericValue)) {
          setPhoneError(t('invalidPhone'));
        } else {
          setPhoneError("");
        }
      } else {
        setPhone(countryCode);
      }
    };

  
    try {
      console.log(user);
      const res = await signIn("credentials", {
        ...user,
        redirect: false,
      });
    
      // Check if res is defined before accessing its properties
      // if (res) {
      //   // обработка ответа от сервера
      //   if (res.ok) {
      //     const data = await res.json();
      //     if (data.token) {
      //       // Запись токена в сессию и возвращение его
      //       sessionStorage.setItem('token', data.token);
      //       return data.token;
      //     }
      //   }
      // }
    } catch (error) {
      // обработка ошибки
    }
  }
  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  const handleDateChange = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) {
      setError(t('incorrectDate'));
      return;
    }

    if (date > new Date()) {
      setError(t('futureBirthDate'));
      return;
    }

    const today = new Date();
    const birthDate = new Date(date);
    const birthYear = birthDate.getFullYear();


    let age = today.getFullYear() - birthYear;
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError(t('minAgeError'));
    } else {
      setError(null);
    }
    setDate(date);
  };
  const handleRawChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (typeof value !== 'string') {
      handleDateChange(value);
      return;
    }

    const date = parse(value, 'dd.MM.yyyy', new Date());

    if (!isValid(date)) {
      setError(t('incorrectDate'));
      return;
    }

    handleDateChange(date);
  };
  return (
    <Modal show={show} onHide={onHide} centered animation>
      <Modal.Header closeButton>
        <Button
          variant="light"
          onClick={() => {
            onHide();
            openModalForm();

          }}
          style={{
            marginRight: 'auto',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            padding: '10px'
          }}
        >
          <ChevronLeft />
        </Button>
        <Modal.Title className={styles.modalTitle}>{t('completeRegistration')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingFirstName"
              type="text"
              placeholder={t('firstName')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="floatingFirstName">{t('firstName')}</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="floatingLastName"
              type="text"
              placeholder={t('lastName')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="floatingLastName">{t('lastName')}</label>
          </Form.Floating>
          <Form.Text className="text-muted small">
            {t('identityData')}
          </Form.Text>

          <div className="form-floating">
  <Form.Select
    id="floatingSelect"
    className="my-2"
    aria-label="Default select example"
    onChange={(e) => {
      setCountryCode(e.target.value);
      setPhone(e.target.value);
    }}
  >
    {countries.map((country) => (
      <option key={country.countryCode} value={country.countryCode}>
        {country.name} ({country.countryCode})
      </option>
    ))}
  </Form.Select>
  <label htmlFor="floatingSelect">{t('selectCountryCode')}</label>
</div>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPhone"
              type="text"
              placeholder={countryCode}
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (value.startsWith(countryCode)) {
                  const numericValue = value.slice(countryCode.length).replace(/\D/g, '');
                  setPhone(countryCode + numericValue);
                } else {
                  setPhone(countryCode);
                }
              }}
            />
            <label htmlFor="floatingPhone">{t('phone')}</label>
          </Form.Floating>

          <div className="form-floating w-100">
            <div style={{ position: 'relative' }} ref={wrapperRef}>
              <DatePicker
                locale={currentLanguage === 'ua' ? uk : enUS}
                id="floatingDate"
                selected={date}
                onChange={handleDateChange}
                onChangeRaw={handleRawChange}
                dateFormat="dd.MM.yyyy"
                className={`form-control ${error ? 'text-danger border-danger' : ''}`}
                wrapperClassName="w-100"
                customInput={
                  <MaskedInput
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                    className={error ? 'input-error' : ''}
                    style={{
                      height: '50px',
                      paddingTop: '20px',
                      flex: 1,
                      color: error ? 'red' : 'inherit',
                      boxShadow: error ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : ''
                    }}
                    onClick={() => setOpen(false)}
                    readOnly
                  />
                }
                open={open}
              />
              <Calendar
                style={{ position: 'absolute', top: '15px', right: '10px', cursor: 'pointer' }}
                onClick={() => setOpen(prevOpen => !prevOpen)}
              />
              {error && <div className="text-danger">{error}</div>}
            </div>

            <label
              htmlFor="floatingDate"
              style={{
                top: '-15px',
                color: error ? 'red' : 'gray',
                fontSize: '0.9rem'
              }}
            >
              {t('birthDate')}
            </label>
            <Form.Text className="text-muted" style={{ marginTop: '20px' }}>
              {t('minAge')}
            </Form.Text>
          </div>

          <Button variant="danger" type="submit" className={`d-grid gap-2 ${styles.submitButton}`}  onClick={handleClick}>
            {t('agreeAndContinue')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegContModal;