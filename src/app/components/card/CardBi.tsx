"use client";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
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
  const handleClickHeart = () => {
    console.log("Button Heart!");
  };

  return (
    <Card className={style.card}>
      <button onClick={handleClickHeart} className={style.btn}></button>
      <CarouselBi src={src} handleClick={(event) => handleClick(event)} />
      <Card.Body className={style.cardBody} onClick={handleClick}>
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
                />
                <span> {thisRating}</span>
              </div>
            </Col>
          )}
        </Row>
        <p className={style.text}> {name}</p>
        <p className={style.text}> {date}</p>
        <p className={style.subtitle}> {price}р ночь</p>
      </Card.Body>
      {thisChoiceGuests && (
        <span className={style.choiceGuests}>вибір гостей</span>
      )}
    </Card>
  );
};
export { CardBi };
