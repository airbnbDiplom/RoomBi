"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { isMap } from "@/app/redux/appState/appSlice";
import style from "./showMapBtn.module.css";

const ShowMapBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);
  const click = () => {
    dispatch(isMap(!isShowMap));
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
