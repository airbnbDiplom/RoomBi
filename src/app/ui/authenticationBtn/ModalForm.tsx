"use client";
import { Modal, Form, Button } from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./AuthenticationBtn.module.css";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
interface ModalFormProps {
  show: boolean;
  isRegistration: boolean;
  handleClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  show,
  isRegistration,
  handleClose,
}) => {
  const { t } = useTranslation();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  undefined;

  const handleSignIn = async () => {
    try {
      const res = await signIn("google", { callbackUrl });
      console.log("---handleSignIn---", res);
      handleClose();
    } catch (error) {
      console.error("Помилка входу через Google:", error);
    }
  };
  const validatePassword = (password: string) => {
    return password.length >= 5;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordValid(validatePassword(event.target.value));
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const touch = () => {
    if (!isRegistration) {
      if (password == "") {
        setIsPasswordValid(false);
        return false;
      }
      if (email == "") {
        setIsEmailValid(false);
        return false;
      }
    } else if (isRegistration) {
      if (password == "") {
        setIsPasswordValid(false);
        return false;
      }
      if (email == "") {
        setIsEmailValid(false);
        return false;
      }
      if (repeatPassword == "" || repeatPassword != password) {
        setIsRepeatPasswordValid(false);
        return false;
      }
    }
    return true;
  };

  const cleaning = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const signinType = async (type: string) => {
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        type: type,
        redirect: false,
      });
      if (res && res.error) {
        console.log("Authentication error: ", res);
        // Опрацювання помилки тут
      } else {
        console.log("OK - ", res);
      }
    } catch (error) {
      console.error("Error: ", error);
      // Опрацювання помилки тут
    }
  };

  const handleSubmit = async () => {
    if (!touch()) return null;

    if (!isRegistration) {
      cleaning();
      handleClose();
      signinType("login");
    } else if (isRegistration) {
      cleaning();
      handleClose();
      signinType("register");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered animation>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>
          {t("enterOrRegister")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h2 className={styles.welcomeMessage}>{t("welcomeMessage")}</h2>
          <Form>
            <Form.Group controlId="formBasicEmail" className="my-3">
              <Form.Control
                className={styles.formControl}
                type="email"
                placeholder={t("email")}
                value={email}
                isInvalid={!isEmailValid}
                onChange={handleEmailChange}
              />
              <Form.Control.Feedback type="invalid">
                {t("enterValidEmail")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="my-3">
              <Form.Control
                type="password"
                placeholder={t("password")}
                value={password}
                isInvalid={!isPasswordValid}
                onChange={handlePasswordChange}
              />
              <Form.Control.Feedback type="invalid">
                {t("passwordMustBeAtLeast5")}
              </Form.Control.Feedback>
            </Form.Group>
            {isRegistration && (
              <Form.Group controlId="formBasicRepeatPassword" className="my-3">
                <Form.Control
                  type="password"
                  placeholder={t("confirmPassword")}
                  value={repeatPassword}
                  isInvalid={!isRepeatPasswordValid}
                  onChange={handleRepeatPasswordChange}
                />
                <Form.Control.Feedback type="invalid">
                  {t("passwordsDoNotMatch")}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Button
              className={`d-grid gap-2 ${styles.submitButton}`}
              variant="danger"
              type="submit"
              onClick={handleSubmit}
            >
              {t("continue")}
            </Button>
          </Form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <hr style={{ flex: 1 }} />
            <p style={{ margin: "0 10px" }}>{t("or")}</p>
            <hr style={{ flex: 1 }} />
          </div>
          <Button
            variant="outline-dark"
            className={`google-button ${styles.googleButton}`}
            onClick={handleSignIn}
          >
            <Image
              priority
              src="./icon/google.svg"
              width={18}
              height={18}
              alt="google icon"
            />
            {t("continueWithGoogle")}
          </Button>
          <button onClick={() => signOut()}>signOut</button>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
