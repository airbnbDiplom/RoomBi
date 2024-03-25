"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/redux/hook";
import style from "./rightBlock.module.css";

const RightBlock: React.FC = () => {
  const { t } = useTranslation();
  const { rentalApartment } = useAppSelector((state) => state.reservReducer);
  console.log("RightBlock _rentalApartment- ", rentalApartment);
  // if (rentalApartment)
  return (
    <div>
      <h1>hi RightBlock</h1>
    </div>
  );
};
export { RightBlock };
