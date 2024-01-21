import Link from "next/link";
import React from "react";
import style from "./Footer.module.css";
import { SocialNetwork } from "./socialNetwork/SocialNetwork";
import { FooterButton } from "./footerButton/FooterButton";
const Footer: React.FC = () => {
  return (
    <footer className={style.container + " border-top border-dark"}>
      <div className={style.left}>
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

      <div className={style.right}>
        <FooterButton
          title="Українська (UA)"
          src="/footer/language.svg"
          event="Мова"
        />
        <FooterButton
          title="USD"
          src="/footer/dollar.svg"
          event="конвертер валют"
        />
        <SocialNetwork src="/footer/inst.svg" />
        <SocialNetwork src="/footer/fb.png" />
        <SocialNetwork src="/footer/git.png" />
        <SocialNetwork src="/footer/link.png" />
      </div>
    </footer>
  );
};

export { Footer };
