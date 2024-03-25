"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./userInfo.module.css";
import { Foto } from "../foto/Foto";
import { MainHeader } from "../main-header/MainHeader";
import { MainContent } from "../main-content/MainContent";
import { Rating } from "../rating/Rating";
import { Comments } from "../comments/Comments";
import { Master } from "../main-content/master/Master";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setId, setRentalApartment } from "@/app/redux/reservState/reservSlice";
import { useSession } from "next-auth/react";
import { ReservMenu } from "../main-content/reservMenu/ReservMenu";
import Link from "next/link";

const UserInfo: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  console.log("hous_+_", data);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const session = useSession();
  dispatch(setId(data.id));
  dispatch(setRentalApartment(data));
  const { date } = useAppSelector((state) => state.reservReducer);
  const [fontWeight, setFontWeight] = useState("500");
  const MapInf = useMemo(
    () =>
      dynamic(
        () =>
          import("@/app/[locale]/[id]/components/map/MapInf").then(
            (mod) => mod.MapInf
          ),
        {
          ssr: false,
        }
      ),
    []
  );
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log("date", date);
    if (date === null) {
      setFontWeight("800");
      e.preventDefault();
      setTimeout(() => {
        setFontWeight("500");
      }, 500);
    }
  };
  return (
    <div className={style.container}>
      <MainHeader data={data} />
      <Foto data={data.pictures} />
      <MainContent data={data} />
      <div className={style.reservMenu}>
        <ReservMenu data={data.dateBooking} />
      </div>

      <span className={style.br}></span>
      <Rating data={data} />
      <Comments data={data.guestComments} />
      <span className={style.br}></span>
      <div className={style.test}>
        <MapInf latMap={data.latMap} ingMap={data.ingMap} />
      </div>
      <p>{data.offeredAmenities.description}</p>
      <p>{data.offeredAmenities.specialFeatures}</p>
      <span className={style.br}></span>
      <div className={style.footer}>
        <div>
          <Master data={data.master} />
          <Rating data={data} />
        </div>
        <div>
          {session.data && (
            <span className={style.btn}>
              <Link
                className={style.linkBtn}
                href={"/contactHost"}
                onClick={handleClick}
              >
                {" "}
                {t("contactHostApartament")}
              </Link>
            </span>
          )}
          {date === null && (
            <p
              style={{
                color: "red",
                margin: "20px",
                fontWeight: `${fontWeight}`,
              }}
            >
              {t("chooseDateApartament")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export { UserInfo };
