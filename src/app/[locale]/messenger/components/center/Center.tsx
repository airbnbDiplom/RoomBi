"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import style from "./center.module.css";
import {
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
} from "@/app/redux/appState/appSlice";

const Center: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messages } = useAppSelector((state) => state.appReducer);
  console.log("RightBlock _rentalApartment- ", messages);
  const setMessengerDisplayCenter = () => {
    dispatch(setMessengerDisplayLeftBlock("block"));
    dispatch(setMessengerDisplayCenterBlock("none"));
  };
  // if (rentalApartment)
  return (
    <div>
      <h1 onClick={setMessengerDisplayCenter}>hi Center</h1>
      {messages.map((item) => (
        <div key={item.dateTime.toString()}>{item.comment}</div>
      ))}
    </div>
  );
};
export { Center };
