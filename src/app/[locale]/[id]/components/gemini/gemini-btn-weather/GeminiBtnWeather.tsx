"use client";
import { WeatherDay } from "@/app/type/type";
import style from "./geminiBtnWeather.module.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import { Box, LinearProgress } from "@mui/material";
import { ItemWeather } from "./item-weather/ItemWeather";
import { fetchDataFromGeminiAPI } from "../Gemini";

const GeminiBtnWeather: React.FC = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [error, setError] = useState("");
  const handleClose = () => {
    setWeather([]);
    setError("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { t } = useTranslation();

  const date = useAppSelector((state) => state.reservReducer.date);
  const ingMap = useAppSelector(
    (state) => state.reservReducer.rentalApartment?.ingMap
  );
  const latMap = useAppSelector(
    (state) => state.reservReducer.rentalApartment?.latMap
  );

  const getGeminiBtnWeather = async () => {
    try {
      let differenceInDays = 1;
      let promt = "";
      if (date) {
        const startDate = new Date(
          date?.start.year,
          date?.start.month,
          date?.start.day
        );

        const endDate = new Date(
          date?.end.year,
          date?.end.month,
          date?.end.day
        );
        const differenceInMilliseconds =
          endDate.getTime() - startDate.getTime();
        // Перетворюємо різницю в днях
        differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        differenceInDays += 1;
        promt = `яка буде погода на обрані дати ${startDate}-${endDate} днів в ingMap ${ingMap} latMap ${latMap}}. відповідь надай українською мовою в форматі лише із масива, який містить JSON-об'єкти із ключами:
    {
      "date": "день місяць рік",
      "temperature": {
        "min": ,
        "max": 
      },
      "precipitation": {
        "amount": ,
        "probability": 
      },
      "wind": {
        "speed": ,
        "direction": ""
      }
    }`;
      }

      setLoading(true);
      handleShow();

      console.log("promt", promt);
      const res = await fetchDataFromGeminiAPI(promt);
      setLoading(false);
      if (typeof res === "string") {
        if (
          res ==
          "Ваше розташування  не підтримується для використання даної функції (використайте VPN)"
        ) {
          setError(
            "Ваше розташування  не підтримується для використання даної функції (використайте VPN)"
          );
          return;
        }
        // Знайти перший символ "["
        const startIndex = res.indexOf("[");
        // Знайти останній символ "]"
        const endIndex = res.lastIndexOf("]");
        // Витягнути JSON-рядок, включаючи квадратні дужки
        const jsonSubstring = res.substring(startIndex, endIndex + 1);
        const data = JSON.parse(jsonSubstring);
        console.log("data ", data);
        setWeather(data);
      } else {
        console.error("Response is not a string"); // Обробка помилки, якщо отримане значення не є рядком
      }
    } catch {
      setError("Спробуйте ще раз.");

      return;
    }
  };

  return (
    <div className={style.container}>
      <button className={style.btnShowModal} onClick={getGeminiBtnWeather}>
        {t("geminiBtnWeather")}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("weatherForSelectedDates")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress /> <p>{t("updatingData")}</p>
            </Box>
          )}
          {error}
          {weather &&
            weather.map((item) => <ItemWeather key={item.date} data={item} />)}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export { GeminiBtnWeather };
