"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/redux/hook";
import style from "./rightBlock.module.css";
import { MessageListProps } from "@/app/type/type";

const RightBlock: React.FC<MessageListProps> = ({ messages }) => {
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
