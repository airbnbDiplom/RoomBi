"use client";
import style from "./geminiTranslateComments.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { setComments } from "@/app/redux/reservState/reservSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { fetchDataFromGeminiAPI } from "../Gemini";
import { Box, LinearProgress } from "@mui/material";
import { Alert } from "react-bootstrap";

const GeminiTranslateComments: React.FC = () => {
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState("English");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const guestComments = useAppSelector(
    (state) => state.reservReducer.rentalApartment?.guestComments
  );

  const translateComments = async () => {
    try {
      setLoading(true);
      const comments = JSON.stringify(guestComments);
      const promt = `translate the meaning of the comment keys ${comments} into ${language} and return only an array in JSON format`;
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
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 3000);
          return;
        }
        const startIndex = res.indexOf("[");
        const endIndex = res.lastIndexOf("]");
        const jsonSubstring = res.substring(startIndex, endIndex + 1);
        const data = JSON.parse(jsonSubstring);
        dispatch(setComments(data));
      } else {
        console.error("Response is not a string");
      }

      if (language === "English") setLanguage("Ukrainian");
      else setLanguage("English");
    } catch {
      setError("Спробуйте ще раз.");

      return;
    }
  };

  return (
    <>
      <button className={style.btnShowModal} onClick={translateComments}>
        {t("translateComments")}
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </button>
      <Alert
        show={show}
        variant="success"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{error}</Alert.Heading>
      </Alert>
    </>
  );
};
export { GeminiTranslateComments };
