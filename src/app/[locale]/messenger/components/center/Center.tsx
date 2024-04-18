"use client";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import style from "./center.module.css";
import {
  sendMessageRedax,
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
} from "@/app/redux/appState/appSlice";
import {
  decodeTokenGetUserId,
  decodeTokenGetUserName,
} from "@/app/services/jwtDecoder";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
  ChatForApartmentPageDTO,
  ChatForApartmentPageDTORedax,
} from "@/app/type/type";
import { sendMessageFetch } from "@/app/services/messagesService";
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
  const sendMessage = async () => {
    if (session.data?.user?.name) {
      const myId = decodeTokenGetUserId(session.data?.user?.name);

      if (message != "") {
        if (messages?.message[0].rentalApartmentId) {
          let idTo;
          let idFrom;

          if (myId == messages?.message[0].toId.toString()) {
            idTo = messages?.message[0].fromId;
            idFrom = messages?.message[0].toId;
          } else {
            idTo = messages?.message[0].toId;
            idFrom = messages?.message[0].fromId;
          }

          let msSend: ChatForApartmentPageDTORedax = {
            comment: message,
            rentalApartmentId: messages?.message[0].rentalApartmentId,
            fromId: idFrom,
            toId: idTo,
            dateTime: new Date().toString(),
          };
          if (session.data?.user?.name) {
            const ms: ChatForApartmentPageDTO = {
              comment: msSend.comment,
              rentalApartmentId: msSend.rentalApartmentId,
              fromId: msSend.fromId,
              toId: msSend.toId,
              dateTime: new Date(),
            };

            const status = await sendMessageFetch(ms, session.data?.user?.name);
            if (status == 200) {
              dispatch(sendMessageRedax(msSend));
              setMessage("");
            } else {
              const errorMg = "Повідомлення не доставлене.";
              msSend.comment = errorMg;
              dispatch(sendMessageRedax(msSend));
              setMessage("");
            }
          }
        }
      }
    }
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
          <h1>{messages?.nameTo}</h1>
        </div>
        <div className={style.containerMessage}>
          {messages?.message.map((item) => {
            let myId = "";

            if (session.data?.user?.name != null) {
              myId = decodeTokenGetUserId(session.data?.user?.name)!;
            }

            if (item.fromId.toString() === myId && session.data?.user?.name) {
              if (
                decodeTokenGetUserName(session.data?.user?.name) ===
                messages.nameFrom.split(" ")[0]
              ) {
                return (
                  <div
                    key={item.dateTime.toString()}
                    className={style.lmessage}
                  >
                    <div className={style.lmessage2}>
                      <div className={style.messagesHeader}>
                        <p className={style.name}>{messages.nameFrom}</p>
                        <p className={style.date}>
                          {convertToDateTime(item.dateTime)}
                        </p>
                      </div>

                      <p> {item.comment}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.dateTime.toString()}
                    className={style.lmessage}
                  >
                    <div className={style.lmessage2}>
                      <div className={style.messagesHeader}>
                        <p className={style.name}>{messages.nameTo}</p>
                        <p className={style.date}>
                          {convertToDateTime(item.dateTime)}
                        </p>
                      </div>

                      <p> {item.comment}</p>
                    </div>
                  </div>
                );
              }
            } else {
              if (session.data?.user?.name)
                if (
                  decodeTokenGetUserName(session.data?.user?.name) !==
                  messages.nameFrom.split(" ")[0]
                ) {
                  return (
                    <div
                      key={item.dateTime.toString()}
                      className={style.rmessage}
                    >
                      <div className={style.rmessage2}>
                        <div className={style.messagesHeader}>
                          <p className={style.name}>{messages.nameFrom}</p>
                          <p className={style.date}>
                            {convertToDateTime(item.dateTime)}
                          </p>
                        </div>

                        <p> {item.comment}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={item.dateTime.toString()}
                      className={style.rmessage}
                    >
                      <div className={style.rmessage2}>
                        <div className={style.messagesHeader}>
                          <p className={style.name}>{messages.nameTo}</p>
                          <p className={style.date}>
                            {convertToDateTime(item.dateTime)}
                          </p>
                        </div>

                        <p> {item.comment}</p>
                      </div>
                    </div>
                  );
                }
            }
          })}
        </div>

        <div className={style.form}>
          <input
            className={style.input}
            type="text"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />
          {message !== "" && (
            <button className={style.btn} onClick={sendMessage}>
              ⇑
            </button>
          )}
        </div>
      </div>
    );
  }
};
export { Center };
