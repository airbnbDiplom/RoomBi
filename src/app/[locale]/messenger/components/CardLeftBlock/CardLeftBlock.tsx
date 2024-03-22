"use client";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import style from "./cardLeftBlock.module.css";
import {
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
  setMessages,
} from "@/app/redux/appState/appSlice";
import { CardLeftBlockProps } from "@/app/type/type";
import Image from "next/image";

const CardLeftBlock: React.FC<CardLeftBlockProps> = ({
  fotoMaster,
  message,
}) => {
  const dispatch = useAppDispatch();
  const setMessengerDisplayLeft = () => {
    dispatch(setMessages(message));
    if (window.innerWidth > 800) {
      console.log("window.innerWidth", window.innerWidth);
      dispatch(setMessengerDisplayCenterBlock("block"));
      dispatch(setMessengerDisplayLeftBlock("block"));
    } else {
      console.log("window.innerWidth", window.innerWidth);
      dispatch(setMessengerDisplayCenterBlock("block"));
      dispatch(setMessengerDisplayLeftBlock("none"));
    }
  };
  const lng = useAppSelector((state) => state.appReducer.location);
  const dateParse = (date: string) => {
    const d = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    let formatter;
    if (lng !== "en") {
      formatter = new Intl.DateTimeFormat("uk-UA", options);
    } else {
      formatter = new Intl.DateTimeFormat("en-US", options);
    }
    const formattedDate = formatter.format(d);
    const parts = formattedDate.split(" ");
    const newFormattedDate = `${parts[1]} ${parts[0]}, ${parts[2]}`;
    return newFormattedDate;
  };

  return (
    <div className={style.container} onClick={setMessengerDisplayLeft}>
      <Image
        className={style.img}
        src={`https://roombi.space/Avatar/${fotoMaster}`}
        width={70}
        height={70}
        alt="Picture of the author"
      />
      <div className={style.messageContainer}>
        <p onClick={setMessengerDisplayLeft} className={style.message}>
          {message[0].comment}
        </p>
        <p className={style.time}>
          {dateParse(message[0].dateTime.toString())}
        </p>
      </div>
    </div>
  );
};
export { CardLeftBlock };
