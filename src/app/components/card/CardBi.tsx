"use client";
import React from "react";
import { CarouselBi } from "./carousel/CarouselBi";
import Card from "react-bootstrap/Card";
import style from "./cardBi.module.css";

export interface CardBiProps {
  id: number;
  title: string;
  name: string;
  date: string;
  src: string[];
  price: number;
}
const CardBi: React.FC<CardBiProps> = ({ src, title, name, date, price }) => {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <Card className={style.card}>
      <button onClick={handleClick} className={style.btn}></button>
      <CarouselBi src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text> {name}</Card.Text>
        <Card.Text> {date}</Card.Text>
        <Card.Text> {price}р ночь</Card.Text>
      </Card.Body>
    </Card>
  );
};
export { CardBi };
