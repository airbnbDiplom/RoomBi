"use client";
import { PlacesGemini } from "@/app/type/type";
import style from "./geminiInterestingPlacesNearbyBtn.module.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import { Box, LinearProgress } from "@mui/material";
import { fetchDataFromGeminiAPI } from "../Gemini";
import { ItemGeminiInterestingPlacesNearbyBtn } from "./item-GeminiInterestingPlacesNearbyBtn/ItemGeminiInterestingPlacesNearbyBtn";

const GeminiInterestingPlacesNearbyBtn: React.FC = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<PlacesGemini[]>([]);
  const [error, setError] = useState("");
  const handleClose = () => {
    setPlaces([]);
    setError("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { t } = useTranslation();
  const ingMap = useAppSelector(
    (state) => state.reservReducer.rentalApartment?.ingMap
  );
  const latMap = useAppSelector(
    (state) => state.reservReducer.rentalApartment?.latMap
  );

  const getPlaces = async () => {
    try {
      const promt = `What are the best places to visit near the location with ingMap ${ingMap} and latMap ${latMap}?
    Provide your answer in Ukrainian language in the format of an array containing JSON objects with the following properties:
    {
      name: string; // The name of the place
      distance: number; // The distance in kilometers
      category: string; // The category of the place (e.g., restaurant, museum, park, etc.)
    }`;
      setLoading(true);
      handleShow();

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
        const jsonSubstring = res.substring(startIndex, endIndex + 1);
        const data = JSON.parse(jsonSubstring);
        setPlaces(data);
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
      <button className={style.btnShowModal} onClick={getPlaces}>
        {t("interestingPlacesNearby")}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("interestingPlacesNearby")}</Modal.Title>
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
              <ItemGeminiInterestingPlacesNearbyBtn
                key={item.name + item.category + item.distance}
                data={item}
              />
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export { GeminiInterestingPlacesNearbyBtn };
