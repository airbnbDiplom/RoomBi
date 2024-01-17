import Link from "next/link";
import React from "react";
import style from "./Footer.module.css";
import { SocialNetwork } from "./socialNetwork/SocialNetwork";
import { FooterButton } from "./footerButton/FooterButton";
const Footer: React.FC = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-2 border-top border-dark">
      <div className="col-md-6 mb-0 text-muted">
        <span>© 2024 RoomBi</span>
        <span className={style.point}></span>
        <Link className={style.link} href="#">
          Умови
        </Link>
        <span className={style.point}></span>
        <Link className={style.link} href="#">
          Реквізити компанії
        </Link>
        <span className={style.point}></span>
        <Link className={style.link} href="#">
          Підтримка
        </Link>
      </div>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item me-2">
          <FooterButton
            title="Українська (UA)"
            src="/footer/language.svg"
            event="Мова"
          />
        </li>
        <li className="nav-item me-2">
          <FooterButton
            title="USD"
            src="/footer/dollar.svg"
            event="конвертер валют"
          />
        </li>
        <li className="nav-item me-2">
          <SocialNetwork src="/footer/inst.svg" />
        </li>
        <li className="nav-item me-2">
          <SocialNetwork src="/footer/fb.png" />
        </li>
        <li className="nav-item me-2">
          <SocialNetwork src="/footer/git.png" />
        </li>
        <li className="nav-item">
          <SocialNetwork src="/footer/link.png" />
        </li>
      </ul>
    </footer>
  );
};

export { Footer };
