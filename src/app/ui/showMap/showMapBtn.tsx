"use client";
import Image from "next/image";
import style from "./showMapBtn.module.css";

const ShowMapBtn: React.FC = () => {
  const click = () => {
    console.log("Показати мапу");
  };
  return (
    <button onClick={click} className={style.btnStyle}>
      <Image
        priority
        src="./icon/map.svg"
        width={20}
        height={20}
        alt="List icon"
      />
      <p className={style.p}>Показати мапу</p>
    </button>
  );
};

export { ShowMapBtn };
