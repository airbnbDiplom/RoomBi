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
  src,
  title,
  country,
  date,
  price,
  rating,
  choiceGuests,
}) => {
  const router = useRouter();

  const handleClickRouter = () => {
    router.push(`/${id}`);
  };
  const handleClickHeart = () => {
    console.log("Button Heart!");
  };

  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <div>
          {choiceGuests && (
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
          <CarouselBi src={src} handleClick={(event) => handleClickRouter()} />
        </div>
      </div>
      <div className={style.textContainet} onClick={handleClickRouter}>
        <Row>
          <Col xs={{ span: 8 }}>
            <p className={style.subtitle}>{title}</p>
          </Col>
          {rating !== 0 && (
            <Col xs={{ span: 4 }}>
              <div className={style.thisRating}>
                <Image
                  src="/star.svg"
                  width={15}
                  height={15}
                  alt="Picture of the author"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span> {rating}</span>
              </div>
            </Col>
          )}
        </Row>
        <p className={style.text}> {country}</p>
        <p className={style.text}> {date}</p>
        <p className={style.subtitle}> {price}р ночь</p>
      </div>
    </div>
  );
};
export { CardBi };
