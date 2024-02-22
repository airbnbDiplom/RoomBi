"use client";
import { OfferedAmenitiesDTO } from "@/app/type/type";
import style from "./offeredAmenities.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";

const OfferedAmenities: React.FC<{ data: OfferedAmenitiesDTO }> = ({
  data,
}: {
  data: OfferedAmenitiesDTO;
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState<string[]>([]);
  useEffect(() => {
    let keys = [];
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === true) {
        keys.push(key);
      }
    }
    setState(keys);
  }, [data]);
  console.log("state", state);
  return (
    <div>
      <h3>{t("amenitiesTitleApartament")}</h3>
      <div className={style.container}>
        <p>{t("tV" + "Apartament")}</p>
        {state.map((item) => {
          return (
            <Image
              key={item}
              src={`/userInfo/${item}.svg`}
              width={35}
              height={35}
              alt={item}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          );
        })}
      </div>
    </div>
  );
};
export { OfferedAmenities };
