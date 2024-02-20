"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./mainContent.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Master } from "./master/Master";
import { PlaceSleep } from "./place-sleep/PlaceSleep";
import { OfferedAmenities } from "./offered-amenities/OfferedAmenities";
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
        <div className={style.rating}>
          <Image
            src="/star.svg"
            width={15}
            height={15}
            alt="Picture of the author"
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <p>{data.objectRating}</p>
          <span className={style.point}></span>
          <p>
            {data.guestComments?.length} {t("reviewsApartament")}
          </p>
        </div>
        <span className={style.br}></span>
        <Master data={data.master} />
        <span className={style.br}></span>
        <p>
          Тонгвістий котедж у двотисячному гончарному мистецькому селі. Великий
          монолітний будинок з триповерховою терасою Музею культури гітари
          Serra, відомий своїм виразним фасадом у двотисячному гончарному
          селищі, яке дуже добре поєднується з природою. Насолоджуйтеся
          розслаблюючим емоційним цілющим святом у затишній, привітній
        </p>
        <span className={style.br}></span>
        <PlaceSleep data={data.pictures} />
        <span className={style.br}></span>
        <OfferedAmenities data={data.offeredAmenities} />
      </div>
      <div className={style.blockRight}></div>
    </div>
  );
};
export { MainContent };
