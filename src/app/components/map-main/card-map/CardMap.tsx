"use client";
import React, { useEffect, useState } from "react";
import style from "./cardMap.module.css";
import { CarouselMapCard } from "./carousel/CarouselMapCard";
import { Col, Row } from "react-bootstrap";
import { FullRentalItem } from "@/app/type/type";
import Image from "next/image";
import { getMarkerCard } from "@/app/services/housesServices";
import { pushFullRentalItem } from "@/app/redux/apartmentsState/apartmentsSlice";
import { useAppDispatch } from "@/app/redux/hook";
import { useTranslation } from "next-i18next";
// const CardMap: React.FC<CardBiProps> = ({
//   id,
//   pictures,
//   title,
//   country,
//   bookingFree,
//   pricePerNight,
//   objectRating,
// })
const CardMap: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState<FullRentalItem | null>(null);

  useEffect(() => {
    const test = async () => {
      const result = await getMarkerCard(id);
      dispatch(pushFullRentalItem(result));
      setState(result);
    };

    test();
  }, [dispatch, id]); // Зависимость только от id

  const handleClickRouter = () => {
    const newTabUrl = `/${id}`;
    window.open(newTabUrl, "_blank");
  };

  const handleClickHeart = () => {
    console.log("Button Heart!");
  };

  if (state)
    return (
      <div className={style.card}>
        <div className={style.cardHeader}>
          <button
            onClick={handleClickHeart}
            className={style.btnHeart}
          ></button>
        </div>
        <div className={style.caruselContainer}>
          <div className={style.carusel}>
            <CarouselMapCard
              pictures={state.pictures}
              handleClick={handleClickRouter}
            />
          </div>
        </div>
        <div className={style.textContainet} onClick={handleClickRouter}>
          <Row>
            <Col xs={{ span: 8 }}>
              <p className={style.subtitle}>{state.title}</p>
            </Col>
            {state.objectRating !== 0 && (
              <Col xs={{ span: 4 }}>
                <div className={style.thisRating}>
                  <Image
                    src="/star.svg"
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <span> {state.objectRating}</span>
                </div>
              </Col>
            )}
          </Row>
          <p className={style.text}> {state.country}</p>
          <p className={style.subtitle}>
            <strong>
              {state.pricePerNight}$ {t("nightCard")}
            </strong>
            {/* {bookingFree} */}
          </p>
        </div>
      </div>
    );
};
export { CardMap };
