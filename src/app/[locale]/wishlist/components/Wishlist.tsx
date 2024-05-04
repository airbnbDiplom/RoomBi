"use client";
import React, { useEffect, useState } from "react";
import style from "./wishstyle.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import Loading from "@/app/[locale]/loading";
import { useSession } from "next-auth/react";
import { CardBiProps } from "@/app/type/type";
import Image from "next/image";
import {
  removeItemByIdWishList,
  setWishList,
} from "@/app/redux/appState/appSlice";
import { deleteWishlists, putWishlists } from "@/app/services/wishlistsService";

const OneWish: React.FC<CardBiProps> = ({ id, title, country, pictures }) => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const handleClickRouter = () => {
    const newTabUrl = `/${id}`;
    window.open(newTabUrl, "_blank");
  };
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    // const success = await deleteWishlists(id,session.user.name);
    if (session.data?.user?.name) {
      const success = await putWishlists(id, session.data?.user?.name);
      console.log("success -", success);
      if (success === "Ok") {
        console.log("OK handleDelete");
        dispatch(removeItemByIdWishList(id));
      } else {
        console.log("No handleDelete");
      }
    }
  };

  return (
    <div className={style.card} onClick={handleClickRouter}>
      <Row>
        <Col xs={{ span: 8 }}>
          <p className={style.subtitle}>{title}</p>
        </Col>
      </Row>
      <p className={style.text}> {country}</p>
      <div className={style.pictureContainer}>
        <div className={style.imageWrapper}>
          <Image
            className={style.image}
            src={`https://roombi.space/Car/${pictures[0].pictureUrl}`}
            alt={pictures[0].pictureName}
            width={450}
            height={350}
            priority
          />
          <div className={style.deleteButton} onClick={handleDelete}>
            <svg
              className={style.deleteIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WishlistProps {
  cards: CardBiProps[];
}
const Wishlist: React.FC<WishlistProps> = ({ cards }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWishList(cards));
  }, [dispatch, cards]);

  const cardsState = useAppSelector((state) => state.appReducer.wishList);
  console.log("cardsState -", cardsState);
  if (!cardsState) {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      <Row>
        {cardsState.map((item) => (
          <Col key={item.id}>
            <OneWish {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { Wishlist };
