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
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/app/redux/hook";
import { setId } from "@/app/redux/reservState/reservSlice";
import { useSession } from "next-auth/react";
import { ReservMenu } from "../main-content/reservMenu/ReservMenu";
const UserInfo: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const session = useSession();
  dispatch(setId(data.id));
  console.log("getApartamentId", data);
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
              <Button variant="light">{t("contactHostApartament")}</Button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export { UserInfo };
