"use client";
import style from "./filterBtn.module.css";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const FilterBtn: React.FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={style.filterBtn} onClick={handleShow}>
        {" "}
        <Image
          className={style.imgFilterBtn}
          src="/filter/filterBtn.svg"
          width={20}
          height={20}
          alt="filterBtn"
        />
        {t("showBtnFilters")}
      </button>

      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Фільтри</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Тип розміщення</h5>
            <p>Своя кімната і доступ до загальних приміщень.</p>
            <h5>Діапазон цін</h5>
            <h5>Кімнати та ліжка</h5>
            <p>Cпальні</p>
            <p>Ліжка</p>
            <p>Ванні кімнати</p>
            <h5>Першокласне житло</h5>
            <h5>Тип житла</h5>
            <p>Будинок</p>
            <p>Квартира</p>
            <p>Будинок для гостей</p>
            <h5>Зручності</h5>
            <p>Найнеобхідніше</p>
            <p>Характеристики </p>
            <p>Місцезнаходження</p>
            <p>Безпека</p>
            <h5>Можливості бронювання</h5>
            <p>Миттєве бронювання</p>
            <p>
              Оголошення, які можна забронювати, не чекаючи на підтвердження
              господаря.
            </p>
            <p>Самостійне заселення</p>
            <p>Ви легко потрапите в житло, не чекаючи господаря</p>
            <p>Можна з твариною</p>
            <p>Подорожуєте із твариною-помічником?</p>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export { FilterBtn };
