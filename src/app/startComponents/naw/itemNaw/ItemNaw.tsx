"use client";
import Image from "next/image";
import { FilterObj } from "../../../type/type";
import style from "./itemNaw.module.css";

const ItemNaw: React.FC<FilterObj> = ({ label, src, name }) => {
  const handleClick = () => {
    console.log("FilterObj", name);
  };
  return (
    <div className={style.carouselItem} onClick={handleClick}>
      <Image src={src} alt={label} width={20} height={20} />
      <p className={style.name}>{name}</p>
    </div>
  );
};
export { ItemNaw };
