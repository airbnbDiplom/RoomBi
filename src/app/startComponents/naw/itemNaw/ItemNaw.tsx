"use client";
import Image from "next/image";
import { FilterObj } from "../../../type/type";
import style from "./itemNaw.module.css";
import { useAppDispatch } from "@/app/redux/hook";
import { navFilter } from "@/app/redux/apartmentsState/apartmentsSlice";

const ItemNaw: React.FC<FilterObj> = ({ label, src, name, type }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(navFilter({ name, type }));
    console.log("FilterObj", name, type);
  };
  return (
    <div className={style.carouselItem} onClick={handleClick}>
      <Image src={src} alt={label} width={20} height={20} />
      <p className={style.name}>{name}</p>
    </div>
  );
};
export { ItemNaw };
