"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import style from "./center.module.css";
import {
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
} from "@/app/redux/appState/appSlice";
import {
  decodeTokenGetUserId,
  decodeTokenGetUserName,
} from "@/app/services/jwtDecoder";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { useState } from "react";
function convertToDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDateTime = `${day.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedDateTime;
}

const Center: React.FC = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const { t } = useTranslation();
  const { messages } = useAppSelector((state) => state.appReducer);
  const [message, setMessage] = useState("");
  const setMessengerDisplayCenter = () => {
    dispatch(setMessengerDisplayLeftBlock("block"));
    dispatch(setMessengerDisplayCenterBlock("none"));
  };
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  if (session.data?.user?.name) {
    return (
      <div>
        <div className={style.header}>
          <Image
            onClick={setMessengerDisplayCenter}
            className={style.leftArrow}
            src="/filter/leftArrow.svg"
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <h1>{messages?.nameMaster}</h1>
        </div>

        {messages?.message.map((item) => {
          let myId = "";
          if (session.data?.user?.name != null) {
            myId = decodeTokenGetUserId(session.data?.user?.name)!;
          }

          if (item.masterIdUser.toString() !== myId) {
            return (
              <div key={item.dateTime.toString()} className={style.lmessage}>
                <div>
                  <div className={style.messagesHeader}>
                    <p className={style.name}>{messages.nameMaster}</p>
                    <p className={style.date}>
                      {convertToDateTime(item.dateTime)}
                    </p>
                  </div>

                  <p> {item.comment}</p>
                </div>
              </div>
            );
          } else {
            if (session.data?.user?.name)
              return (
                <div key={item.dateTime.toString()} className={style.rmessage}>
                  <div>
                    <div className={style.messagesHeader}>
                      <p className={style.name}>
                        {decodeTokenGetUserName(session.data?.user?.name)}
                      </p>
                      <p className={style.date}>
                        {convertToDateTime(item.dateTime)}
                      </p>
                    </div>

                    <p> {item.comment}</p>
                  </div>
                </div>
              );
          }
        })}
        <div className={style.form}>
          <input
            className={style.input}
            type="text"
            value={message}
            onChange={handleMessageChange}
          />
          {message !== "" && <button className={style.btn}>⇑</button>}
        </div>
      </div>
    );
  }
};
export { Center };
