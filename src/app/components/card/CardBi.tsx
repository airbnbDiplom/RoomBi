"use client";
import React from "react";
import style from "./cardBi.module.css";
import { CarouselBi } from "./carousel/CarouselBi";
import { Col, Row } from "react-bootstrap";
import { CardBiProps } from "../../type/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CardBi: React.FC<CardBiProps> = ({
  id,
  pictures,
  title,
  country,
  bookingFree,
  pricePerNight,
  objectRating,
}) => {
  const router = useRouter();

  // const handleClickRouter = () => {
  //   router.push(`/${id}`);
  // };

  const handleClickRouter = () => {
    const newTabUrl = `/${id}`;
    window.open(newTabUrl, "_blank");
  };
  const handleClickHeart = () => {
    console.log("Button Heart!");
  };

  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <div>
          {objectRating >= 5 && (
            <span onClick={handleClickRouter} className={style.choiceGuests}>
              вибір гостей
            </span>
          )}
        </div>
        <div>
          <button
            onClick={handleClickHeart}
            className={style.btnHeart}
          ></button>
        </div>
      </div>
      <div className={style.caruselContainer}>
        <div className={style.carusel}>
          <CarouselBi
            pictures={pictures}
            handleClick={(event) => handleClickRouter()}
          />
        </div>
      </div>
      <div className={style.textContainet} onClick={handleClickRouter}>
        <Row>
          <Col xs={{ span: 8 }}>
            <p className={style.subtitle}>{title}</p>
          </Col>
          {objectRating !== 0 && (
            <Col xs={{ span: 4 }}>
              <div className={style.thisRating}>
                <Image
                  src="/star.svg"
                  width={15}
                  height={15}
                  alt="Picture of the author"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span> {objectRating}</span>
              </div>
            </Col>
          )}
        </Row>
        <p className={style.text}> {country}</p>
        <p className={style.text}> {bookingFree}</p>
        <p className={style.subtitle}> {pricePerNight}$ ночь</p>
      </div>
    </div>
  );
};
export { CardBi };
