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
  const { rentalApartment } = useAppSelector((state) => state.reservReducer);
  console.log("RightBlock _rentalApartment- ", rentalApartment);
  const setMessengerDisplayCenter = () => {
    dispatch(setMessengerDisplayLeftBlock("block"));
    dispatch(setMessengerDisplayCenterBlock("none"));
  };
  // if (rentalApartment)
  return (
    <div>
      <h1 onClick={setMessengerDisplayCenter}>hi Center</h1>
    </div>
  );
};
export { Center };
