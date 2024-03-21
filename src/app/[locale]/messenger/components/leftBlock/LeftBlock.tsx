"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import style from "./leftBlock.module.css";
import {
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
} from "@/app/redux/appState/appSlice";

const LeftBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { rentalApartment } = useAppSelector((state) => state.reservReducer);
  console.log("RightBlock _rentalApartment- ", rentalApartment);
  const setMessengerDisplayLeft = () => {
    dispatch(setMessengerDisplayCenterBlock("block"));
    dispatch(setMessengerDisplayLeftBlock("none"));
  };
  // if (rentalApartment)
  return (
    <div>
      <h1 onClick={setMessengerDisplayLeft}>hi LeftBlock</h1>
    </div>
  );
};
export { LeftBlock };
