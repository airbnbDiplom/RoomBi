"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import Image from "next/image";
import { Test } from "../../startComponents/testR/Test";
import style from "./objCard.module.css";
const ObjCard: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <Card
      sm={10}
      style={{ width: "18rem", margin: "1rem", display: "inline-block" }}
    >
      <button onClick={handleClick} className={style.btn}></button>
      <Test />
      <CardBody>
        <CardTitle tag="h5">Nowy Probark, Польша</CardTitle>

        <CardText tag="p">Юксти</CardText>
        <CardText tag="p">29 мая - 3 иню</CardText>
        <CardTitle tag="h5">7056р ночь</CardTitle>
      </CardBody>
    </Card>
  );
};

export { ObjCard };
