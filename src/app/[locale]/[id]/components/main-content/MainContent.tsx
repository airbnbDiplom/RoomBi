"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./mainContent.module.css";
import { useTranslation } from "react-i18next";
import { Master } from "./master/Master";
import { PlaceSleep } from "./place-sleep/PlaceSleep";
import { OfferedAmenities } from "./offered-amenities/OfferedAmenities";
import { Rating } from "../rating/Rating";
import { CalendarBi } from "./calendar/CalendarBi";
import { ReservMenu } from "./reservMenu/ReservMenu";
const MainContent: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const { t } = useTranslation();
  console.log("getApartamentId", data);
  return (
    <div className={style.container}>
      <div className={style.blockLeft}>
        <h3>
          {data.country}, {data.address}, {data.typeApartment}
        </h3>
        <p>
          {data.numberOfGuests} {t("guestsApartament")}
          <span className={style.point}></span>
          {data.bedrooms} {t("bedroomApartament")}
          <span className={style.point}></span>
          {data.beds}
          {t("bedApartament")}
          <span className={style.point}></span>
          {data.bathrooms} {t("bathroomApartament")}
        </p>
        <Rating data={data} />
        <span className={style.br}></span>
        <Master data={data.master} />
        <span className={style.br}></span>
        <p>{data.offeredAmenities.description}</p>
        <span className={style.br}></span>
        <PlaceSleep data={data.pictures} />

        <span className={style.br}></span>
        <OfferedAmenities data={data.offeredAmenities} />
        <CalendarBi />
      </div>
      <div className={style.blockRight}>
        <ReservMenu />
      </div>
    </div>
  );
};
export { MainContent };
