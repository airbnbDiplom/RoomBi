"use client";
import style from "./itemGeminiInterestingPlacesNearbyBtn.module.css";
import { useTranslation } from "react-i18next";
import { PlacesGemini } from "@/app/type/type";

const ItemGeminiInterestingPlacesNearbyBtn: React.FC<{
  data: PlacesGemini;
}> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h4>
        {t("placesName") + ": "} {data.name}
      </h4>

      <div className={style.containerWind}>
        <p>
          {t("placesCategory") + ": "} {data.category}
        </p>
        <p>
          {t("placesDistance") + ": "}↔ {data.distance} km
        </p>
      </div>
    </div>
  );
};
export { ItemGeminiInterestingPlacesNearbyBtn };
