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
import { MessageListProps, MessageObj } from "@/app/type/type";
import { Box, LinearProgress } from "@mui/material";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { rentalApartment } = useAppSelector((state) => state.reservReducer);
  const {
    messengerDisplayLeftBlock,
    messengerDisplayCenterBlock,
    messageObjList,
  } = useAppSelector((state) => state.appReducer);

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
  }, [dispatch]);

  console.log("messageObjList", messageObjList);
  if (messageObjList.length > 0)
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
            <LeftBlock messages={messageObjList} />
          </div>
          <div
            className={style.center}
            style={{ display: `${messengerDisplayCenterBlock}` }}
          >
            <Center />
          </div>
          <div className={style.rightBlock}>
            <RightBlock messages={messageObjList} />
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div>
        <div className={style.header}>
          <Header />
        </div>

        <div className={style.container}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress /> <h1>Оновлення повідомлень.</h1>
          </Box>
        </div>
      </div>
    );
  }
};
export { Main };
