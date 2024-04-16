"use client";
import { GuestCommentsForApartmentPage } from "@/app/type/type";
import style from "./comments.module.css";
import { Comment } from "../comment/Comment";
import { BtnsHowMoreComments } from "../btn-show-more-comments/BtnsHowMoreComments";
import { useAppSelector } from "@/app/redux/hook";
import { useEffect, useState } from "react";

const Comments: React.FC<{ data: GuestCommentsForApartmentPage[] }> = ({
  data,
}: {
  data: GuestCommentsForApartmentPage[];
}) => {
  const dataComments = useAppSelector(
    (state) => state.reservReducer.rentalApartment?.guestComments
  );

  useEffect(() => {
    console.log("dataw - ", dataComments);
  }, [dataComments]);

  return (
    <div>
      <div className={style.container}>
        {dataComments &&
          dataComments.slice(0, 4).map((item) => (
            <div key={item.id} className={style.item}>
              <Comment data={item} />
            </div>
          ))}
      </div>
      <BtnsHowMoreComments data={data} />
    </div>
  );
};

export { Comments };
