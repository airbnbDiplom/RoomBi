"use client";
import { LayRoute } from "@/app/type/type";
import style from "./geminiLayRoute.module.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import { Box, LinearProgress } from "@mui/material";
import { fetchDataFromGeminiAPI } from "../Gemini";
import { ItemGeminiLayRoute } from "./item-gemini-lay-route/ItemGeminiLayRoute";

const GeminiLayRoute: React.FC = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<LayRoute[]>([]);
  const [error, setError] = useState("");
  const handleClose = () => {
    setPlaces([]);
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

  const getLayRoute = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          // Отримуємо координати користувача
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLoading(true);
          handleShow();
          const promt = `Lay the shortest path from  ${latitude} ${longitude} to ingMap ${ingMap} and latMap ${latMap}
          Provide your answer in Ukrainian language in the format of an array containing JSON objects with the following properties:
          {
            type: string, // Тип маршруту (літак, потяг, автомобіль)
            description: string, // Опис маршруту
            estimatedTime: string // Приблизний час подорожі
          }`;
          try {
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
              const startIndex = res.indexOf("[");
              const endIndex = res.lastIndexOf("]");
              console.log("startIndex", startIndex);
              console.log("endIndex", endIndex);
              const jsonSubstring = res.substring(startIndex, endIndex + 1);
              const data = JSON.parse(jsonSubstring);
              console.log("data -  ", data); // Вивід отриманих даних у консоль
              setPlaces(data);
            } else {
              console.error("Response is not a string"); // Обробка помилки, якщо отримане значення не є рядком
            }
          } catch {
            setError("Спробуйте ще раз.");

            return;
          }
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported in this browser");
    }
  };

  return (
    <div className={style.container}>
      <button className={style.btnShowModal} onClick={getLayRoute}>
        {t("takeTheShortestRoute")}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("takeTheShortestRoute")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress /> <p>{t("updatingData")}</p>
            </Box>
          )}
          {error}
          {places &&
            places.map((item) => (
              <ItemGeminiLayRoute
                key={item.description + item.type + item.estimatedTime}
                data={item}
              />
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export { GeminiLayRoute };
