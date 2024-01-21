"use client";
import React, { useEffect, useState } from "react";
import style from "./cardBi.module.css";
import { CarouselBi } from "./carousel/CarouselBi";
import { Col, Row } from "react-bootstrap";
import { CardBiProps } from "../../type/type";
import Image from "next/image";

const CardBi: React.FC<CardBiProps> = ({
  src,
  title,
  name,
  date,
  price,
  rating,
  choiceGuests,
}) => {
  const [thisRating, setThisRating] = useState(0);
  const [thisChoiceGuests, setThisChoiceGuests] = useState(false);
  useEffect(() => {
    setThisRating(rating);
    setThisChoiceGuests(choiceGuests);
  }, [choiceGuests, rating]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked!", event.target);
  };
  const handleClickHeart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Зупинити випливання події
    console.log("Button Heart!");
  };
  const handleClickHeader = () => {
    console.log("Button handleClickHeader!");
  };
  const handleClickFooter = () => {
    console.log("handleClickFooter!");
  };
  return (
    <div className={style.card}>
      <div className={style.cardHeader} onClick={handleClickHeader}>
        <div>
          {thisChoiceGuests && (
            <span className={style.choiceGuests}>вибір гостей</span>
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
          <CarouselBi src={src} handleClick={(event) => handleClick(event)} />
        </div>
      </div>

      <div className={style.textContainet} onClick={handleClickFooter}>
        <Row>
          <Col xs={{ span: 8 }}>
            <p className={style.subtitle}>{title}</p>
          </Col>
          {thisRating !== 0 && (
            <Col xs={{ span: 4 }}>
              <div className={style.thisRating}>
                <Image
                  src="/star.svg"
                  width={15}
                  height={15}
                  alt="Picture of the author"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span> {thisRating}</span>
              </div>
            </Col>
          )}
        </Row>
        <p className={style.text}> {name}</p>
        <p className={style.text}> {date}</p>
        <p className={style.subtitle}> {price}р ночь</p>
      </div>
    </div>
  );
};
export { CardBi };
