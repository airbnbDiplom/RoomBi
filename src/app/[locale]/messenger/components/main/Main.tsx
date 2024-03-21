"use client";
import style from "./main.module.css";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Header } from "@/app/startComponents/header/Header";
import { RightBlock } from "../rightBlock/RightBlock";
import { LeftBlock } from "../leftBlock/LeftBlock";
import { Center } from "../center/Center";
import { useEffect, useState } from "react";
import {
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
} from "@/app/redux/appState/appSlice";
const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { rentalApartment } = useAppSelector((state) => state.reservReducer);
  const { messengerDisplayLeftBlock, messengerDisplayCenterBlock } =
    useAppSelector((state) => state.appReducer);
  console.log("rentalApartment", rentalApartment);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        dispatch(setMessengerDisplayCenterBlock("block"));
        dispatch(setMessengerDisplayLeftBlock("block"));
      }
      if (window.innerWidth < 800) {
        dispatch(setMessengerDisplayCenterBlock("none"));
        dispatch(setMessengerDisplayLeftBlock("block"));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]); // Запускається тільки один раз при монтажі компонента
  // if (rentalApartment)
  return (
    <div>
      <div className={style.header}>
        <Header />
      </div>

      <div className={style.container}>
        <div
          className={style.leftBlock}
          style={{ display: `${messengerDisplayLeftBlock}` }}
        >
          <LeftBlock />
        </div>
        <div
          className={style.center}
          style={{ display: `${messengerDisplayCenterBlock}` }}
        >
          <Center />
        </div>
        <div className={style.rightBlock}>
          <RightBlock />
        </div>
      </div>
    </div>
  );
};
export { Main };
