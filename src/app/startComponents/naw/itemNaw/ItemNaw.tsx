"use client";
import Image from "next/image";
import { FilterObj } from "../../../type/type";
import style from "./itemNaw.module.css";
import { useAppDispatch } from "@/app/redux/hook";
import { navFilter } from "@/app/redux/apartmentsState/apartmentsSlice";

const ItemNaw: React.FC<FilterObj> = ({
  label,
  src,
  name,
  type,
  name2,
  id,
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(navFilter({ name, name2, type }));
  };
  return (
    <div className={style.carouselItem} onClick={handleClick}>
      <Image src={src} alt={label} width={20} height={20} />
      {id === 1 ? (
        <p className={style.name}>{name}</p>
      ) : (
        <p className={style.name}>{name2}</p>
      )}
    </div>
  );
};
export { ItemNaw };
