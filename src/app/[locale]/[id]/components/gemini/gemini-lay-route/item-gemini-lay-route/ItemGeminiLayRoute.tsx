"use client";
import style from "./ItemGeminiLayRoute.module.css";
import { useTranslation } from "react-i18next";
import { LayRoute } from "@/app/type/type";

const ItemGeminiLayRoute: React.FC<{
  data: LayRoute;
}> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h4>
        {t("takeTypeRoute") + ": "} {data.type}
      </h4>

      <p>
        {t("takeDescriptionRoute") + ": "} {data.description}
      </p>
      <p>
        {t("takeApproximateTravelTime") + ": "} {data.estimatedTime}
      </p>
    </div>
  );
};
export { ItemGeminiLayRoute };
